// Importamos los modulos de express para crear el servidor y mongoose paraMongo
const express = require("express");
const mongoose = require("mongoose");

// instanciamos la ruta del controlador(routes)
const User = require("./routes/user")

// Creamos la varible principal que ejecuta nuestra app(Instanciando express)
const app = express();

// Usos que tiene mi appapp.use(express.json())
app.use(express.json());
app.use("/api/user", User);

// Creamos la variable del puerto sea hosting o local
const port = process.env.PORT || 3001;

// escuchando el puerto y desplegando el servidor
app.listen(port, () => console.log("Servidor ejecutando en el puerto: " + port)
);// http://localhost:3001/api/user/registerUser

// conexion con MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/retoexpressdiego", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("Conexion con MongoDB: ON"))
.catch((error) => console.log("Error de conexion: ", error))
