const formularioLogin = (req, res) => {
  res.render("auth/login", { authenticado: true });
};

const fromularioRegistro = (req, res) => {
  res.render("auth/registro", { authenticado: true });
};
export { formularioLogin, fromularioRegistro };
