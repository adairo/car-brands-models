import { createRequire } from "node:module";
import client from "./database.js";
// for directly importing json file
const require = createRequire(import.meta.url);

const models = require("./models.json");

// Insert brands
const brands = new Set(models.map((model) => model.brand_name)); // remove duplicates
const brandOperations = Array.from(brands).map((brand) => {
  return client.query(
    `
          INSERT INTO brands
          (name)
          VALUES ($1)
          RETURNING id
      `,
    [brand]
  );
});

await Promise.allSettled(brandOperations)
console.log('Brands saved')

const modelOperations = models.map(async (model) => {
  const {
    rows: [brandResult],
  } = await client.query(
    `
        SELECT
          id
        FROM
          brands b
        WHERE
          b.name = $1
    `,
    [model.brand_name]
  );

  const brandId = brandResult?.id;

  // Insert the model
  return client.query(
    `
    INSERT INTO models
    (name, average_price, brand_id)
    VALUES
      ($1, $2, $3)    
  `,
    [model.name, model.average_price, brandId]
  );
});

const results = await Promise.allSettled(modelOperations);
console.log("Models saved");

console.log("Database population complete");
const errors = results.filter((error) => error.status === "rejected");
console.log(`(${errors.length}) Errors found`);
if (errors.length > 0) {
  console.error(errors.map((error) => error.reason));
}
