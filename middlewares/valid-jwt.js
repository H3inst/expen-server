const { request, response } = require("express");
const jwt = require("jsonwebtoken");

async function validJwt(req = request, res = response, next) {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      status: "ERROR",
      message: "No token provided"
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SEED);

    req.uid = payload.id;
    req.name = payload.username;

  } catch (error) {
    return res.status(401).json({
      status: "ERROR",
      message: "No valid token"
    });
  }

  next();
}

module.exports = validJwt;