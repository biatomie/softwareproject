import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {type: String},
    username: {type: String},
    senha: {type: String}
  }
);

// imoveisSchema.index({ senha: "text"});

const dbUsersMd = mongoose.model("dbUsers", userSchema);

export default dbUsersMd;
