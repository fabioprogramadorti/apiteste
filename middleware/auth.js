const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send({error:"Access denied."});
  try {
    const decoded = jwt.verify(token, config.get("secret"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send(ex.message);
  }
};