const formularioLogin = (req, res) => {
  res.render("auth/login", { authenticado: true });
};

export { formularioLogin };
