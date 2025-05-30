const knex = require("../config/data");

require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    let token = bearer[1];

    try {
      let decode = jwt.verify(token, process.env.SECRET);

      return decode.Cargo == "Admin" || decode.cargo == "Garçom"
        ? next()
        : res
            .status(403)
            .json({ success: false, message: "Usuario sem permissão" });
    } catch (error) {
      return res
        .status(403)
        .json({ success: false, message: "token invalido" });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Usuario não autenticado" });
  }
};
