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
    .then((result) => result.rows);
}

export { getBrands }
