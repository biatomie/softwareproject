import express from "express";
import userController from "../controllers/usersController.js";

const router = express.Router();


router
  .get("/register", userController.pageUser)
  .get("/registerTable", userController.pageTable)
  .post("/register", userController.newUser)
  .get("/editUser/:id", userController.editUser)
  .post("/editUser/:id", userController.updateUser)
  .post("/registerTable/:id", userController.deleteUser)
  .post("/searchUser", userController.searchUser);


export default router;