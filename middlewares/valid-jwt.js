const { request, response } = require("express");
const jwt = require("jsonwebtoken");

async function validJwt(req = request, res = response, next) {
  const token = req.header("x-token");

  if (!token) {
    return res.json({
      status: "error",
      message: "No token provided"
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SEED);
    console.log(payload);

    req.uid = payload.uid;
    req.name = payload.username;

  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "No valid token"
    });
  }

  next();
}

module.exports = validJwt;