import AppError from "../../lib/app-error.js";
import { MINIMUM_AVG_PRICE } from "./models.constants.js";
import * as modelsDatabase from "./models.database.js";

/** @typedef {import('express').RequestHandler} RequestHandler */

/** @type {RequestHandler} */
async function updateModel(req, res, next) {
  const { modelId } = req.params;
  const { average_price } = req.body;

  try {
    const model = await modelsDatabase.getModelById(modelId);
    if (!model) {
      throw new AppError(
        "ResourceNotFound",
        AppError.HTTP_ERRORS.notFound,
        "Model not found"
      );
    }

    if (Number(average_price) <= MINIMUM_AVG_PRICE) {
      throw new AppError(
        "InvalidInput",
        AppError.HTTP_ERRORS.badRequest,
        "Average price must be greater than 100,000"
      );
    }

    const updatedModel = await modelsDatabase.updateModel(modelId, {
      average_price,
    });

    res.status(200).json(updatedModel);
  } catch (error) {
    next(error);
  }
}

export { updateModel };
