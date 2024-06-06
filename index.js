import express from "express";
import { getBrands } from "./src/modules/brands/brands.controller.js";
const PORT = 3000;

const app = express();
app.get("/", (req, res) => res.send("Hello world"));
app.get("/brands", getBrands);
app.listen(PORT, () => {
  console.log(`Server listeting at http://localhost:${PORT}`);
});
