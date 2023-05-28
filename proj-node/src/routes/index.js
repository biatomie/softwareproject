import express from "express";
import properties from "./propertiesRoutes.js";
import users from "./usersRoutes.js";

const routes = (app) => {
  app.use(
    express.json(),
    properties,
    users
  );
};

export default routes;