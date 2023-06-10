import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {type: String, required: true},
    email: {type: String},
    whatsapp: {type: String},
    // property: {type: mongoose.Schema.Types.ObjectId, ref:"dbPropertiesMd" }
    property: {type: String},
  },
  {
    versionKey: false
  }
);

const dbClientsMd = mongoose.model("dbclients", clientsSchema);

export default dbClientsMd;
