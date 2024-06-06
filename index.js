import express from "express";
import * as brandsController from "./src/modules/brands/brands.controller.js";
import handleError from "./src/lib/error-handler.js";
const PORT = 3000;

const app = express();

app.use(express.json());
app.get("/brands", brandsController.getBrands);
app.post("/brands", brandsController.createBrand);
app.get("/brands/:brandId/models", brandsController.getModelsOfBrand);
app.post("/brands/:brandId/models", brandsController.createModelOnBrand);

app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server listeting at PORT ${PORT}`);
});


