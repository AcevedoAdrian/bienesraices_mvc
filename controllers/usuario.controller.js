const formularioLogin = (req, res) => {
  res.render("auth/login", { pagina: "Iniciar Sesión" });
};

const fromularioRegistro = (req, res) => {
  res.render("auth/registro", { pagina: "Crear Cuenta" });
};

const formularioRecuperarPassword = (req, res) => {
  res.render("auth/recuperar-password", { pagina: "Recuperar Password" });
};
export { formularioLogin, fromularioRegistro, formularioRecuperarPassword };
