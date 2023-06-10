import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema(
  {
    id: {type: String},
    logradouro: {type: String},
    bairro: {type: String},
    cidade: {type: String},
    metragem: {type: Number},
    quartos: {type: Number},
    banheiros: {type: Number},
    vagas: {type: Number},
    valor: {type: Number},
    client: {type: mongoose.Schema.Types.ObjectId, ref:"dbClientsMd" },
    user: {type: mongoose.Schema.Types.ObjectId, ref:"dbUsersMd" },
  }
);

// propertiesSchema.index({ bairro: "text"});

const dbPropertiesMd = mongoose.model("dbproperties", propertiesSchema);

export default dbPropertiesMd;
