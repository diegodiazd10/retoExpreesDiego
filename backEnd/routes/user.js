// Importamos los modulos necesarios
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// registrar usuario - async await POST 
router.post("/registerUser", async (req, res) => {
  //validamos que el correo exista en la BD
  let user = await User.findOne({ email: req.body.email });
  // si el usuario ya existe mostramos un mensaje
  if (user)
    return res.status(400).send("Existe un usuario registrado con ese email");
  // encriptamos el password
  const hash = await bcrypt.hash(req.body.password, 10);
  // guardamos los datos del usuario
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  // Guardar el documento en la coleccion de Mongo DB
  const result = await user.save();
  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({jwtToken});
  } else {
    return res.status(400).send("No se pudo Registrar el usuario");
  }
});

module.exports = router;