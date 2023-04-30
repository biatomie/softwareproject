import express from "express";
import ImovelController from "../controllers/imoveisController.js";

const router = express.Router();


router
  .get("/", ImovelController.page)
  .post("/imoveis", ImovelController.cadastrarImovel)
  .post("/imoveis/:id", ImovelController.excluirImovel)
  .get("/imoveis", ImovelController.page)
  .post("/search", ImovelController.procurar)
  .get("/edit/:id", ImovelController.editar)
  .post("/edit/:id", ImovelController.atualizarImovel);


export default router;