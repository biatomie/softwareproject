import express from "express";
import imoveis from "./imoveisRoutes.js";
import users from "./usersRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    imoveis,
    users
  );
};

export default routes;