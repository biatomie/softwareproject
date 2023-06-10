import express from "express";
import propertyController from "../controllers/propertiesController.js";

const router = express.Router();


router
  // .get("/", propertyController.page)
  .get("/property", propertyController.page)
  .post("/property", propertyController.newProperty)
  .get("/edit/:id", propertyController.editProperty)
  .post("/edit/:id", propertyController.updateProperty)
  .post("/property/:id", propertyController.deleteProperty)
  .post("/search", propertyController.searchProperty);


export default router;