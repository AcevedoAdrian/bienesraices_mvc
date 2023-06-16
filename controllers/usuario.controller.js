import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", { pagina: "Iniciar Sesión" });
};

const fromularioRegistro = (req, res) => {
  res.render("auth/registro", { pagina: "Crear Cuenta" });
};

const registrar = async (req, res) => {
  //Validaciones
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacio")
    .run(req);
  await check("email").isEmail().withMessage("Eso no parece un email").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El Password deve ser de al menos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals("password")
    .withMessage("Los Passwords no son iguales")
    .run(req);
  let resultadoValidation = validationResult(req);

  // Cerificamos que el resultado este vacio
  if (!resultadoValidation.isEmpty()) {
    // Errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: resultadoValidation.array(),
    });
  }
  res.json(resultadoValidation.array());

  const usuario = await Usuario.create(req.body);
  res.json(usuario);
};

const formularioRecuperarPassword = (req, res) => {
  res.render("auth/recuperar-password", { pagina: "Recuperar Password" });
};
export {
  formularioLogin,
  fromularioRegistro,
  formularioRecuperarPassword,
  registrar,
};
