import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", { pagina: "Iniciar Sesión" });
};

const fromularioRegistro = (req, res) => {
  res.render("auth/registro", { pagina: "Crear Cuenta" });
};

const registrar = async (req, res) => {
  console.log(req.body);
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
