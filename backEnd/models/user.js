const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  active: Boolean,
  date: { type: Date, default: Date.now },
});

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      roleId: this.roleId,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY_JWT
  );
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
