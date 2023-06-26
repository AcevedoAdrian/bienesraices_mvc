import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";
import bcrypt from "bcrypt";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
    csrfToken: req.csrfToken(),
  });
};

const autenticar = async (req, res) => {
  await check("email")
    .isEmail()
    .withMessage("El email es obligatorio")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .run(req);
  let resultadoValidation = validationResult(req);
  // res.json(resultadoValidation);

  // Cerificamos que el resultado este vacio
  if (!resultadoValidation.isEmpty()) {
    // Errores
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: resultadoValidation.array(),
    });
  }

  const { email, password } = req.body;
  // Comprobrar si el usuario existe

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    // Errores
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario no existe" }],
    });
  }

  // Comprobar su el usuaruio esta cinfirmado
  if (!usuario.confirmado) {
    // Errores
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario no esta confirmado" }],
    });
  }
};

const fromularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
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
      csrfToken: req.csrfToken(),
      // convertimos los error que resivimos desde express-validator y lo convertimos en array
      errores: resultadoValidation.array(),

      csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
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
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    // mandar por email para validar que es una persona para confirmar su cuenta
    token: generarId(),
  });

  // Envia email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  res.render("templates/mensaje", {
    pagina: "Cuenta creada correctamente",
    mensaje: "Hemos enviados un Email de confirmacion. Presiona en el enlace.",
  });
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
      error: true,
    });
  }
  usuario.token = null;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta Confirmada",
    mensaje: "La cuenta se confirmo correctamente",
  });
};

const formularioRecuperarPassword = (req, res) => {
  res.render("auth/recuperar-password", {
    pagina: "Recuperar Password",
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  //Validaciones
  await check("email")
    .isEmail()
    .withMessage("El email ingresado no es valido")
    .run(req);

  let resultadoValidation = validationResult(req);
  if (!resultadoValidation.isEmpty()) {
    // Errores
    return res.render("auth/recuperar-password", {
      pagina: "Recuperar tu acceso a Bienes Raices ",
      csrfToken: req.csrfToken(),
      errores: resultadoValidation.array(),
    });
  }

  //Buscar el usuario por el email
  const { email } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.render("auth/recuperar-password", {
      pagina: "Recuperar tu acceso a Bienes Raices ",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El email no pertenece a ningun usuario" }],
    });
  }

  // Generar un token y enviar el email
  usuario.token = generarId();
  usuario.confirmado = null;
  await usuario.save();

  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  //Mostrar un mensaje de confirmacion

  res.render("templates/mensaje", {
    pagina: "Restable tu password",
    mensaje: "Hemos un mail con las instrucciones",
  });
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Reestablece tu password",
      mensaje: "Hubo un error al validar tu informacion, intenta de nuevo",
      error: true,
    });
  }

  res.render("auth/reset-password", {
    pagina: "Reesetablece tu Password",
    csrfToken: req.csrfToken(),
  });
};
const nuevoPassword = async (req, res) => {
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El Password deve ser de al menos 6 caracteres")
    .run(req);
  let resultadoValidation = validationResult(req);
  if (!resultadoValidation.isEmpty()) {
    // Errores
    return res.render("auth/reset-password", {
      pagina: "Reestablece tu password ",
      csrfToken: req.csrfToken(),
      errores: resultadoValidation.array(),
    });
  }

  const { token } = req.params;
  const { password } = req.body;

  // Identidicar quien hace el cambio
  const usuario = await Usuario.findOne({ where: { token } });
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  usuario.token = null;

  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Password Reestablecido",
    mensaje: "El password se guardo correctamente",
  });
};
export {
  formularioLogin,
  autenticar,
  fromularioRegistro,
  registrar,
  confirmar,
  formularioRecuperarPassword,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};
