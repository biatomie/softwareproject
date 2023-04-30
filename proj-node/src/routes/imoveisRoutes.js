import express from "express";
import ImovelController from "../controllers/imoveisController.js";

const router = express.Router();


router
// .get("/imoveis", ImovelController.listarImovel)
  .get("/", ImovelController.page)
  .get("/imoveis/:id", ImovelController.listarImovelPorId)
  .post("/imoveis/:id", ImovelController.excluirImovel)
  .post("/imoveis", ImovelController.cadastrarImovel)
  .put("/imoveis/:id", ImovelController.atualizarImovel)
  .get("/imoveis", ImovelController.page)
  .post("/search", ImovelController.procurar);
// .get("/search", ImovelController.listarImoveisPorBairro);

export default router;