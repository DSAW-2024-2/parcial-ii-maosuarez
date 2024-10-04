const jwt = require("jsonwebtoken");

const secretKey = "Maito1234";

const codify = function (obj) {
  const token = jwt.sign(obj, secretKey);
  return token;
};

const decode = function (token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    //console.log("Decoded payload:", decoded);
    return decoded;
  } catch (error) {
    return false;
  }
};

module.exports = { decode, codify };
