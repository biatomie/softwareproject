import express from "express";
import ImovelController from "../controllers/imoveisController.js";

const router = express.Router();


router
    .get("/imoveis", ImovelController.listarImovel)
    .get("/imoveis/:id", ImovelController.listarImovelPorId)
    .post("/imoveis", ImovelController.cadastrarImovel)
    .put("/imoveis/:id", ImovelController.atualizarImovel)
    .delete("/imoveis/:id", ImovelController.excluirImovel)

export default router;