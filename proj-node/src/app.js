import express from "express";
import db from "./config/dbConnect.js"
import router from "./routes/imoveisRoutes.js";
import routes from "./routes/index.js"


db.on("error", console.log.bind(console, 'Erro de conexão'))

const app = express();

app.set('view engine', 'ejs');

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())//interpretar a resposta em json

routes(app);

app.use(express.static('public'))


export default app