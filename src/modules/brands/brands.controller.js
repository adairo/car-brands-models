import * as brandsDatabase from "./brands.database.js";

/** @typedef {import('express').RequestHandler} RequestHandler */

/** @type {RequestHandler} */
async function getBrands(_req, res) {
  const brands = await brandsDatabase.getBrands();
  res.status(200).json(brands);
}

/** @type {RequestHandler} */
async function getModelsOfBrand(req, res) {
  const { brandId } = req.params;
  const models = await brandsDatabase.getModelsOfBrand(brandId);
  res.status(200).json(models);
}

export { getBrands, getModelsOfBrand };
