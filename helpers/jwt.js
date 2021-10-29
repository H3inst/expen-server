const jwt = require("jsonwebtoken");

function generateJwt(uid, username) {

  return new Promise((resolve, reject) => {
    const payload = { uid, username };
    
    jwt.sign(payload, process.env.JWT_SEED, {
      expiresIn: "2h",
    }, (error, token) => {
      if (error) {
        console.log(error);
        reject("The token cannot be generated.");
      }

      resolve(token);
    });
  });
}

module.exports = generateJwt;