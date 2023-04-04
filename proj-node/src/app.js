import express from "express";
import db from "./config/dbConnect.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log("conexão com o banco feita com sucesso")
})

const app = express();

app.use(express.json())//interpretar a resposta em json

const imoveis = [
    {id: 1, "end": "jabaquara"},
    {id: 2, "end": "saude"}
]

app.get('/', (req, res) => {
    res.status(200).send('Imóveis');
})

app.get('/cadastro', (req, res) => {
    res.status(200).json(imoveis);
})


app.get('/cadastro/:id', (req, res) => {
    let index = buscaImovel(req.params.id); //parametro id da requisição
    res.json(imoveis[index]);
})

app.post('/cadastro', (req, res) => {
    imoveis.push(req.body);
    res.status(201).send("Imóvel cadastrado com sucesso")
})

app.put('/cadastro/:id', (req, res) => {
    let index = buscaImovel(req.params.id); //parametro id da requisição
    imoveis[index].end = req.body.end;
    res.json(imoveis);
})

function buscaImovel(id) {
    return imoveis.findIndex(imovel => imovel.id == id)
}

export default app
