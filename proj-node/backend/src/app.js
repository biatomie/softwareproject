import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())//interpretar a resposta em json
routes(app);

export default app