import express from "express";

const router = express.Router();

// router.get("/", function (req, res) {
//   res.send("Bienvenidos a la tienda");
// });

// router.get("/nosotros", function (req, res) {
//   res.json({ msg: "Somos una empresa elite" });
// });

router.get("/login", (req, res) => {
  res.render("auth/login", { authenticado: true });
});

// router
//   .route("/")
//   .get(function (req, res) {
//     res.send("Bienvenidos a la tienda");
//   })
//   .post(function (req, res) {
//     res.send("Peticion post a la tienda");
//   });

export default router;
