import express from "express";
import imoveis from "./imoveisRoutes.js";
import dbImoveisMd from "../models/Imovel.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    // res.status(200).send({titulo: "Imobiliária"})
    res.render("index");
  });
  app.route("/imoveis").get((req, res) => {
    // res.status(200).send({titulo: "Imobiliária"})
    dbImoveisMd.find({}, function(err, dbImoveis) {
      res.render("index", {
        imoveisList: dbImoveis
      });
    });
        
  });
  // app.route("/search").post((req, res) => {
  //   // res.status(200).send({titulo: "Imobiliária"})
  //   dbImoveisMd.find({}, function(err, dbImoveis) {
  //     res.render("search", {
  //       imoveisSearch: index
  //     });
  //   });
        
  // });


  app.use(
    express.json(),
    imoveis
  );
};

export default routes;