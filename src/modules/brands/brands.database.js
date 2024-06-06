import client from "../../config/database/database.js";

function getBrands() {
  return client
    .query(
      `
        SELECT
          b.id id,
          b.name name,
          AVG(m.average_price)::NUMERIC(10, 2) average_price
        FROM
          models m
        INNER JOIN
          brands b
          ON m.brand_id = b.id
        GROUP BY
          b.id
    `
    )
    .then(({ rows }) => rows);
}

function getModelsOfBrand(brandId) {
  return client.query(
    `
        SELECT
          id,
          name,
          average_price,
          brand_id
        FROM
          models
        WHERE
          brand_id = $1
    `,
    [brandId]
  ).then(({ rows }) => rows);
}

export { getBrands, getModelsOfBrand };
