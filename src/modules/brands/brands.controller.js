import AppError from "../../lib/app-error.js";
import * as brandsDatabase from "./brands.database.js";
import * as modelsDatabase from "../models/models.database.js";
import { MINIMUM_AVG_PRICE } from "../models/models.constants.js";

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

/** @type {RequestHandler} */
async function createModelOnBrand(req, res, next) {
  const { brandId } = req.params;
  const { name, average_price } = req.body;

  try {
    const existentBrand = await brandsDatabase.getBrandById(brandId);
    if (!existentBrand) {
      throw new AppError(
        "ResourceNotFound",
        AppError.HTTP_ERRORS.notFound,
        "Brand does not exist"
      );
    }

    const alreadyExistentModel = await modelsDatabase.getModelByName(name);
    if (alreadyExistentModel) {
      throw new AppError(
        "DuplicatedResource",
        AppError.HTTP_ERRORS.conflict,
        "Model already exist"
      );
    }

    if (
      typeof average_price !== "undefined" &&
      Number(average_price) <= MINIMUM_AVG_PRICE
    ) {
      throw new AppError(
        "InvalidInput",
        AppError.HTTP_ERRORS.badRequest,
        "Average price must be greater than 100,000"
      );
    }

    const model = await modelsDatabase.createModelOnBrand(brandId, {
      name,
      average_price,
    });

    res.status(200).json(model);
  } catch (error) {
    next(error);
  }
}

export { getBrands, getModelsOfBrand, createBrand, createModelOnBrand };
