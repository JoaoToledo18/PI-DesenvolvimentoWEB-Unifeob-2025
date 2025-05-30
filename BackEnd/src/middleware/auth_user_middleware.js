require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = function (...cargosPermitidos) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(403).json({ erro: "Sem Token" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      req.usuario = decoded;

      const tipoUsuario = decoded.Cargo; 

      if (cargosPermitidos.includes(tipoUsuario)) {
        return next();
      } else {
        return res.status(403).json({ erro: "Permissão negada." });
      }
    } catch (error) {
      return res.status(403).json({ erro: "Token inválido.", detalhes: error });
    }
  };
};