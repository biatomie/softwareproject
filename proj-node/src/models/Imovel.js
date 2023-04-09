import mongoose from "mongoose";

const imoveisSchema = new mongoose.Schema(
    {
        id: {type: String},
        rua: {type: String},
        bairro: {type: String},
        cidade: {type: String},
        metragem: {type: Number},
        quartos: {type: Number},
        banheiros: {type: Number},
        vagas: {type: Number},
        valor: {type: Number}
    }
);

const imoveis = mongoose.model("imoveis", imoveisSchema);

export default imoveis;
