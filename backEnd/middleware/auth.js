const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(401).send("Authorization denied: No Token");

  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken) return res.status(401).send("Authorization denied: No Token");

  try {
    const payload = await jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).send("Authorization denied: Invalid Token");
  }
};

module.exports = auth;
