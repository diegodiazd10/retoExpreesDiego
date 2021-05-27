const express = require("express");
const router = express.Router();
// Importamos Modelo usuario
const User = require("../models/user");

// Importamos bcrypt
const bcrypt = require("bcrypt");

// funcion login del usuario
router.post("/login", async (req, res) => {
  
  // buscamos correo
  let user = await User.findOne({ email: req.body.email });
  //validamos si el correo trae resultados
  if (!user) return res.status(400).send("email o password incorrectos");
  // Comparamos el pass que entra con el hash de la BD
  const hash = await bcrypt.compare(req.body.password, user.password);
  // Validamos si el pass coincide o no
  if(!hash) return res.status(400).send("email o password incorrectos")
  // devolvemos el token
  const jwtToken = user.generateJWT();
  return res.status(200).send({jwtToken})
});

module.exports = router;