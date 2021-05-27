// importamos modulos
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// registar actividad sin imagen
router.post("/saveTask", Auth, async (req, res) =>{
    // buscamos Usuario de la peticion
    const user = await User.findById(req.user._id);
    // Sino se encuentra el usuario 
    if(!user) return res.status(401).send("Usuario no autenticado");
    // Si el usuario existe procedemos a registrar
    const board = new Board({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do",
    });
    //guardamos en mongo DB
    const result = await board.save();
    return res.status(200).send({result})
});

router.get("/listTask", Auth, async (req, res) => {
     //obtenemos el usuario por id
    const user = await User.findById(req.user._id);
    // validamos si el usuario existe
    if (!user) return res.status(401).send("Usuario no registrado en BD");
    //si el usuario existe
    const board = await Board.find({userId: req.user._id})
    return res.status(200).send({board});
})
   

module.exports = router;