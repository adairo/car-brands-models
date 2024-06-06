import client from "../../config/database/database.js";
/** @typedef {{ id: number, name: string, average_price: number}} Brand */
/** @typedef {{ id: number, name: string, brand_id: number, average_price: number}} Model */

/** @returns { Promise<Brand[]>} */
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
    .then(({ rows: brands }) => brands);
}

/**
 *
 * @param {number} brandId Brand id
 * @returns {Promise<Model[]>}
 */
function getModelsOfBrand(brandId) {
  return client
    .query(
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
    )
    .then(({ rows: models }) => models);
}

/**
 *
 * @param {{ name: string}} payload
 * @returns {Promise<Brand>}
 */
function createBrand({ name }) {
  return client
    .query(
      `
        INSERT INTO brands
        (name)
        VALUES ($1)
        RETURNING
          id, 
          name
      `,
      [name]
    )
    .then(({ rows: [brand] }) => brand);
}

/**
 *
 * @param {number} id
 * @returns {Promise<Brand>}
 */
function getBrandByName(name) {
  return client
    .query(
      `
        SELECT
          id,
          name
        FROM
          brands b
        WHERE
          b.name = $1
        `,
      [name]
    )
    .then(({ rows: [brand] }) => brand);
}

export { getBrands, getModelsOfBrand, createBrand, getBrandByName };
