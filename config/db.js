import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const db = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS ?? "",
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: true, // Agrega 2 campos a la base de datos, con la fecha de creacion y fecha de actualizacion
    },
    pool: {
      //configuracion para conexiones nuevas o existentes de db manteniendo o reutilizando las conexiones que estan vivas.- pool de conexion
      max: 5, // Maximo de conexiones a mantener
      min: 0, // Minimo
      acquire: 30000, // en milisegundos tiempo que trata de elavorar una conexion.- tiempo para encontrar un error
      idle: 10000, // segundo ve en lo que no hay nada de movimiento o conexion para finalizar conexion.- para liberar espacio o memoria
    },
    operatorAliases: false,
  }
);

export default db;
