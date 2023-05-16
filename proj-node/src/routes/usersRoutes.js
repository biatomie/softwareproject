import express from "express";
import userController from "../controllers/usersController.js";

const router = express.Router();


router
  .post("/cadastro", userController.cadastrarUser)
  .post("/tabelaCadastro/:id", userController.excluirUser)
  .get("/cadastro", userController.pageUser)
  .get("/tabelaCadastro", userController.pageTabela)
  .post("/searchUser", userController.procurarUser)
  .get("/editUser/:id", userController.editarUser)
  .post("/editUser/:id", userController.atualizarUser);


export default router;