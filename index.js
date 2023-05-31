import express from "express";
// Importamos con la extencion del archivo
import usuarioRoutes from "./routes/usuario.routes.js";

// Crear la app
const app = express();

// Habilitar Pug
app.set("view engine", "pug"); // Le decimos con que tipo detemplateing vamos a usar
app.set("views", "./views"); // Indicamos que carpeta vamos a usar

//Contenedor de los archivos estaticos - CARPETA PUBLICA
app.use(express.static("public"));

// Routing - Medellware de expres
// app.use("/", usuarioRoutes);
app.use("/auth", usuarioRoutes);

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
