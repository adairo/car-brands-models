import AppError from "../../lib/app-error.js";
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

/** @type {RequestHandler} */
async function createBrand(req, res, next) {
  const { name } = req.body;

  try {
    const existentBrand = await brandsDatabase.getBrandByName(name);
    if (existentBrand) {
      throw new AppError(
        "DuplicatedResource",
        AppError.HTTP_ERRORS.conflict,
        "Brand already exists"
      );
    }
    const brand = await brandsDatabase.createBrand({ name });
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
}

export { getBrands, getModelsOfBrand, createBrand };
