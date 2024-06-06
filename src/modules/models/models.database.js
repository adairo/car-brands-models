import client from "../../config/database/database.js";

function getModelByName(name) {
  return client
    .query(
      `
        SELECT
          id,
          name,
          average_price
        FROM
          models m
        WHERE
          m.name = $1
    `,
      [name]
    )
    .then(({ rows: [model] }) => model);
}

function getModelById(id) {
  return client
    .query(
      `
        SELECT
          id,
          name,
          average_price
        FROM
          models m
        WHERE
          m.id = $1
    `,
      [id]
    )
    .then(({ rows: [model] }) => model);
}

function createModelOnBrand(brandId, { name, average_price = 0 }) {
  return client
    .query(
      `
        INSERT INTO models
        (name, average_price, brand_id)
        VALUES
          ($1, $2, $3)
        RETURNING
          id,
          name,
          average_price,
          brand_id
      `,
      [name, average_price, brandId]
    )
    .then(({ rows: [model] }) => model);
}

function updateModel(modelId, { average_price }) {
  return client
    .query(
      `
        UPDATE models
        SET
          average_price = $1
        WHERE
          id = $2
        RETURNING
          id,
          name,
          average_price,
          brand_id
      `,
      [average_price, modelId]
    )
    .then(({ rows: [model] }) => model);
}

function getModels({
  lower = Number.POSITIVE_INFINITY,
  greater = Number.NEGATIVE_INFINITY,
}) {
  return client
    .query(
      `
        SELECT
          id,
          name,
          average_price,
          brand_id
        FROM
          models m
        WHERE
          average_price > $1 AND
          average_price < $2
      `,
      [greater, lower]
    )
    .then(({ rows: models }) => models);
}

export {
  getModelByName,
  getModelById,
  createModelOnBrand,
  updateModel,
  getModels,
};
