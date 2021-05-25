// Importamos los modulos necesarios
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/registerUser", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user)
    return res.status(400).send("Existe un usuario registrado con ese email");

  const hash = await bcrypt.hash(req.body.password, 10);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  const result = await user.save();
  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({jwtToken});
  } else {
    return res.status(400).send("No se pudo Registrar el usuario");
  }
});

module.exports = router;