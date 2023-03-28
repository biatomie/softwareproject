import express from "express";

const app = express();

const imoveis = [
    {id: 1, "endereco": "jabaquara"},
    {id: 2, "endereco": "saude"}
]

app.get('/', (req, res) => {
    res.status(200).send('Imóveis');
})

app.get('/cadastro', (req, res) => {
    res.status(200).send('Cadastro de Imoveis', (req, res) => {
        res.status(200).json(imoveis)    
    });
})

export default app
