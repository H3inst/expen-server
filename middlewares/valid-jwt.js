const { request, response } = require("express");

async function validJwt(req = request, res = response, next) {
    const token = req.headers("x-token");

    console.log(token);
    
    next();
}

module.exports = validJwt;