const jwt = require("jsonwebtoken");

function generateJwt(id, username) {

  return new Promise((resolve, reject) => {
    const payload = { id, username };
    
    jwt.sign(payload, "djkb3k1jbd", {
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