import express from "express";
import {
  formularioLogin,
  autenticar,
  fromularioRegistro,
  registrar,
  confirmar,
  formularioRecuperarPassword,
  resetPassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/usuario.controller.js";

const router = express.Router();

// router.get("/", function (req, res) {
//   res.send("Bienvenidos a la tienda");
// });

// router.get("/nosotros", function (req, res) {
//   res.json({ msg: "Somos una empresa elite" });
// });

router.get("/login", formularioLogin);
router.post("/login", autenticar);

router.get("/registro", fromularioRegistro);
router.post("/registro", registrar);
router.get("/confirmar/:token", confirmar);

router.get("/recuperar-password", formularioRecuperarPassword);
router.post("/recuperar-password", resetPassword);

router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

// Almacena el nuevo password
// router
//   .route("/")
//   .get(function (req, res) {
//     res.send("Bienvenidos a la tienda");
//   })
//   .post(function (req, res) {
//     res.send("Peticion post a la tienda");
//   });

export default router;
