import express from "express";
import {
  formularioLogin,
  fromularioRegistro,
  formularioRecuperarPassword,
} from "../controllers/usuario.controller.js";

const router = express.Router();

// router.get("/", function (req, res) {
//   res.send("Bienvenidos a la tienda");
// });

// router.get("/nosotros", function (req, res) {
//   res.json({ msg: "Somos una empresa elite" });
// });

router.get("/login", formularioLogin);
router.get("/registro", fromularioRegistro);
router.get("/recuperar-password", formularioRecuperarPassword);
// router
//   .route("/")
//   .get(function (req, res) {
//     res.send("Bienvenidos a la tienda");
//   })
//   .post(function (req, res) {
//     res.send("Peticion post a la tienda");
//   });

export default router;
