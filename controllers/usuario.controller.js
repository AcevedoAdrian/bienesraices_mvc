import { check, validationResult } from "express-validator";
import { generarId } from "../helpers/tockens.js";
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
  await check("email")
    .isEmail()
    .withMessage("El email ingresado no es valido")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El Password deve ser de al menos 6 caracteres")
    .run(req);
  await check("repite_password")
    .equals(req.body.password)
    .withMessage("Los Passwords no son iguales")
    .run(req);

  let resultadoValidation = validationResult(req);
  // res.json(resultadoValidation);

  // Cerificamos que el resultado este vacio
  if (!resultadoValidation.isEmpty()) {
    // Errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      // convertimos los error que resivimos desde express-validator y lo convertimos en array
      errores: resultadoValidation.array(),
      usuario: {
        nombre: req.body.nombre,
        correo: req.body.email,
      },
    });
  }

  const existeUsuario = await Usuario.findOne({
    where: { email: req.body.email },
  });
  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      // convertimos los error que resivimos desde express-validator y lo convertimos en array
      errores: [{ msg: "El usuario ya esta Registrado" }],
      usuario: {
        nombre: req.body.nombre,
        correo: req.body.email,
      },
    });
  }
  const { nombre, email, password } = req.body;
  // res.json(resultadoValidation.array());
  // const usuario = await Usuario.create(req.body);
  // res.json(usuario);
  // Alamcenar un usuario
  await Usuario.create({
    nombre,
    email,
    password,
    // mandar por email para validar que es una persona para confirmar su cuenta
    token: generarId(),
  });

  res.render("templates/mensaje", {
    pagina: "Cuenta creada correctamente",
    mensaje: "Hemos enviados un Email de confirmacion. Presiona en el enlace.",
  });
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
