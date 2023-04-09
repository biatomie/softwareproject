import express from "express";
import imoveis from "./imoveisRoutes.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Imobiliária"})
    })

    app.use(
        express.json(),
        imoveis
    )
}

export default routes