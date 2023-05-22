import express from "express";

// Crear la app
const app = express();

// Routing
app.get("/", function (req, res) {
  res.send("Bienvenidos a la tienda");
});

app.get("/nosotros", function (req, res) {
  res.json({ msj: "Somos una empresa elite" });
});

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
