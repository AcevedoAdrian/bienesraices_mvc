import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const Usuario = db.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
  },
  {
    // Hook de squelize
    hooks: {
      // Metodo que actua antes de guardar en base de datos y recibe por parametros req.body = usuario
      beforeCreate: async function (usuario) {
        // genera la semilla o salt para despues usarla para hashear, mientras mas alto el numero mas dificil de desencriptar pero esta es tambien mas recursos
        const salt = await bcrypt.genSalt(10);
        // rescribe el valor del password hasheando el valor que tenia mas el salt, dando como resultado una contrasena encriptada
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
  }
);

export default Usuario;
