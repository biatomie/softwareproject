import mongoose from "mongoose";

const imoveisSchema = new mongoose.Schema(
  {
    id: {type: String},
    logradouro: {type: String},
    bairro: {type: String},
    cidade: {type: String},
    metragem: {type: Number},
    quartos: {type: Number},
    banheiros: {type: Number},
    vagas: {type: Number},
    valor: {type: Number}
  }
);

// imoveisSchema.index({ bairro: "text"});

const dbImoveisMd = mongoose.model("dbImoveis", imoveisSchema);

export default dbImoveisMd;
