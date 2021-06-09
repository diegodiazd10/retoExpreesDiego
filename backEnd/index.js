// Importamos los modulos de express para crear el servidor y mongoose paraMongo
const express = require("express");
const cors = require("cors");
const {dbConnection} = require("./db/db");
require("dotenv").config();


// instanciamos la ruta del controlador(routes)
const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");
const Role = require("./routes/role")

// Creamos la varible principal que ejecuta nuestra app(Instanciando express)
const app = express();

// Usos que tiene mi appapp.use(express.json())
app.use(express.json());
app.use(cors());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);
app.use("/api/role/", Role)


// escuchando el puerto y desplegando el servidor
app.listen(process.env.PORT, () =>
  console.log("Servidor ejecutando en el puerto: " + process.env.PORT)
); // http://localhost:3001/api/user/registerUser

dbConnection();
