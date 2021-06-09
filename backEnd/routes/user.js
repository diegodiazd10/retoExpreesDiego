const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");
const mongoose = require("mongoose");
const Admin = require("../middleware/admin");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

router.post("/registerUser", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Process failed: Incomplete data");

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send("Process failed: The user is already registered");

  const hash = await bcrypt.hash(req.body.password, 10);

  const role = await Role.findOne({ name: "user" });
  if (!role)
    return res.status(400).send("Process failed: No role was assigned");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    active: true,
  });

  try {
    const result = await user.save();
    if (!result) return res.status(401).send("Failed to register user");
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Failed to register user");
  }
});

router.get("/listUsers/:name?", Auth, UserAuth, Admin, async (req, res) => {
  const users = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if (!users) return res.status(401).send("Process failed: No users");
  return res.status(200).send({ users });
});

router.post("/registerAdmin", Auth, UserAuth, Admin, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send("Process failed: The user is already registered");

  const hash = await bcrypt.hash(req.body.password, 10);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    active: true,
  });

  try {
    const result = await user.save();
    if (!result) return res.status(401).send("Failed to register user");
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Failed to register user");
  }
});

router.put("/updateUser", Auth, UserAuth, Admin, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(401).send("Process failed: Incomplete data");

  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    active: req.body.active,
  });
  if (!user) return res.status(401).send("Process failed: Error editing User");
  return res.status(200).send({ user });
});

router.delete("/deleteUser/:_id", Auth, UserAuth, Admin, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");
  const users = await User.findByIdAndDelete(req.params._id);
  if (!users) return res.status(401).send("Failed to delete user");
  return res.status(200).send("User deleted");
});

router.put("/deleteUser", Auth, UserAuth, Admin, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(401).send("Process failed: Incomplete data");

  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    active: false,
  });
  if (!user) return res.status(401).send("Process failed: Error delete User");
  return res.status(200).send({ user });
});

module.exports = router;
