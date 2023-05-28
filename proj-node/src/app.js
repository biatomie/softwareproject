import express from "express";
import expressLayout from "express-ejs-layouts";
// import mongoose from "mongoose";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";


db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log(`Banco de dados conectado: ${db.host}`);
});

const app = express();

//Template
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/main");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());//interpretar a resposta em json

routes(app);

// Static files 
app.use(express.static("public"));

// Page 404
app.get("*", (req,res) => {
  res.status(404).render("404");
});
export default app;