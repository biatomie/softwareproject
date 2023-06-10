import express from "express";
import properties from "./propertiesRoutes.js";
import users from "./usersRoutes.js";
import clients from "./clientsRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    properties,
    users,
    clients
  );
};

export default routes;