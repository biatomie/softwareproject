import express from "express";
import imoveis from "./imoveisRoutes.js"

const routes = (app) => {
    app.route('/imoveis').get((req, res) => {
        // res.status(200).send({titulo: "Imobiliária"})
        res.render('views')
    })

    app.use(
        express.json(),
        imoveis
    )
}

export default routes