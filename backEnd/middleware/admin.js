const Role = require("../models/role");

const admin = async (req, res, next) => {
  const role = await Role.findById(req.user.roleId);
  if (!role)
    return res.status(401).send("Process failed: role does not exists");

  if (role.name == "admin") next();
  else return res.status(401).send("Process failed: Unauthorized user: ");
};

module.exports = admin;
