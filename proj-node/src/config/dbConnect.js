import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterimoveis.2ydm2hv.mongodb.net/node`)
  .catch(err => console.error(err));

let db = mongoose.connection;

export default db;
