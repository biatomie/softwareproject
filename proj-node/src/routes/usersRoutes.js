import express from "express";
import userController from "../controllers/usersController.js";
import { check, validationResult } from "express-validator";


const router = express.Router();


router
  .get("/login", userController.pageLogin)
  .get("/home", userController.pageHome)
  .post("/", userController.login)
  .get("/logout", userController.pageLogout)
  .get("/register", userController.pageUser)
  .get("/registerTable", userController.pageTable)
  .get("/editUser/:id", userController.editUser)
  .post("/editUser/:id", userController.updateUser)
  .post("/registerTable/:id", userController.deleteUser)
  .post("/searchUser", userController.searchUser)
  .post("/register", [
    check("username", "Este username tem que ter pelo menos 3 caracteres")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Este e-mail não é válido")
      .isEmail()
      .normalizeEmail(),
    check("password")
      .exists()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 8 })
      .withMessage("A senha deve ter no mínimo 8 caracteres"),
    check("confpass")
      .exists()
      .withMessage("A confirmação de senha é obrigatória")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("A confirmação de senha deve ser igual à senha"),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      const alert = errors.array();
      res.render("register", {
        alert
      });
    }
    userController.newUser(req, res);
  }
  );


export default router;