import express from "express";
import * as brandsController from "./src/modules/brands/brands.controller.js";
import * as modelsController from "./src/modules/models/models.controller.js";

import handleError from "./src/lib/error-handler.js";
const PORT = 3000;

const app = express();

app.use(express.json());
// brands
app.get("/brands", brandsController.getBrands);
app.post("/brands", brandsController.createBrand);
app.get("/brands/:brandId/models", brandsController.getModelsOfBrand);
app.post("/brands/:brandId/models", brandsController.createModelOnBrand);
// models
app.put("/models/:modelId", modelsController.updateModel)
app.get("/models", modelsController.getModels)

app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server listeting at PORT ${PORT}`);
});


