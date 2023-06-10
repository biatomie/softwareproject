import express from "express";
import clientController from "../controllers/clientsController.js";

const router = express.Router();


router
  .get("/client", clientController.pageClient)
  .post("/client", clientController.newClient)
  .get("/editClient/:id", clientController.editClient)
  .post("/editClient/:id", clientController.updateClient)
  .post("/client/:id", clientController.deleteClient);



export default router;