import * as brandsDatabase from "./brands.database.js";

/** @typedef {import('express').RequestHandler} RequestHandler */

/** @type {RequestHandler} */
async function getBrands(_req, res) {
  const brands = await brandsDatabase.getBrands();
  res.status(200).json(brands);
}


export { getBrands }