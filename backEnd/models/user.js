// importamos modulos
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// creamos el esquema de user (coleccion)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date,
  default: Date.now,}
});

// generamos jwt para el usuario
userSchema.methods.generateJWT = function(){
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      iat: moment().unix(),
    },
    "secretJWT"
  );
};

// coleccion user en mongo
const User = mongoose.model("user", userSchema);

// exportar modulo
module.exports = User;
