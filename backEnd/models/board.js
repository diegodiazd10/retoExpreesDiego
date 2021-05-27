// importamos modulos
const mongoose = require("mongoose");

// coleccion de tablero
const boardSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  status: String,
  imageUrl: String,
  date: { type: Date,
  default: Date.now,}
});

// conexion board
const Board = mongoose.model("board", boardSchema);

module.exports = Board;

