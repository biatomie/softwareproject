import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {type: String},
    username: {type: String},
    email: {type: String},
    password: {type: String}
  }
);



const dbUsersMd = mongoose.model("dbUsers", userSchema);

export default dbUsersMd;
