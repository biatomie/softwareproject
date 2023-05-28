import express from "express";
import propertyController from "../controllers/propertiesController.js";

const router = express.Router();


router
  .get("/", propertyController.page)
  .get("/imoveis", propertyController.page)
  .post("/imoveis", propertyController.newProperty)
  .get("/edit/:id", propertyController.editProperty)
  .post("/edit/:id", propertyController.updateProperty)
  .post("/imoveis/:id", propertyController.deleteProperty)
  .post("/search", propertyController.searchProperty);


export default router;