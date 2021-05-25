// importamos los modulos de Mongo, jwt y moment
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// Creamos el esquema de user (Coleccion)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
});

// Generamos jwt para el usuario
userSchema.methods.generateJWT = () => {
  return jwt.sign(
    {
      _id: this.discriminate,
      name: this.name,
      iat: moment().unix(),
    },
    "secretJWT"
  );
};

const User = mongoose.model("user", userSchema);

// Exportar Modulo
module.exports = User;
