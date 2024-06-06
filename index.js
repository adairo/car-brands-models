import express from "express";
import { getBrands, getModelsOfBrand } from "./src/modules/brands/brands.controller.js";
const PORT = 3000;

const app = express();
app.get("/", (req, res) => res.send("Hello world"));
app.get("/brands", getBrands);
app.get("/brands/:brandId/models", getModelsOfBrand);

app.listen(PORT, () => {
  console.log(`Server listeting at http://localhost:${PORT}`);
});
