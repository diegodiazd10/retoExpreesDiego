// importamos modulo jsonwebtoken
const jwt = require("jsonwebtoken");

// validamos la autenticacion
const auth = (req, res, next) => {
  // revisamos el header en su parte de autorizaciones
  let jwtToken = req.header("Authorization");
  //validamos si existe el jwt
  if (!jwtToken)
    return res.status(401).send("Autorizacion rechazada: No hay un Token");
  // si existe el jwt vamos a separar el payload
  jwtToken = jwtToken.split(" ")[1];

  if (!jwtToken)
    return res.status(401).send("Autorizacion rechazada: No hay un Token");
  // validamos que sea un token nuestro
  try {
    //revisamos apalabra secreta del payload
    const payload = jwt.verify(jwtToken, "secretJWT");
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send("Autorizacion rechazada: Token no valido");
  }
};

// exportamos modulo
module.exports = auth;
