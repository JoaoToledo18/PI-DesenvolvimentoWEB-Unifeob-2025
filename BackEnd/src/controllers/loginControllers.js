require("dotenv").config();

const users = require("../models/Users");

const comparePasswordService = require("../service/compare_password_service");

const jwt = require("jsonwebtoken");

const knex = require("../config/data");

class LoginController {
  async login(req, res) {
    let { Usuario, Senha } = req.body;

    let user = await users.BuscarPorUsuario(Usuario);

    if (user.values != undefined) {
      let passValidated = comparePasswordService(Senha, user.values.Senha);
      if (passValidated) {
        let permissao = await knex("funcionarios")
        .join("cargos", "funcionarios.Cargo", "cargos.Cargoid")
        .select(
          "funcionarios.FuncionarioID",
          "funcionarios.Nome as nome_funcionario",
          "cargos.nome as nome_cargo",
          "cargos.descricao"
        )
        .where("funcionarios.FuncionarioID", user.values.FuncionarioID);;

        let token = jwt.sign(
          {
            Usuario: user.values.Usuario,
            Cargo: permissao[0]?.nome_cargo,
            Permissao: permissao[0]?.descricao,
            CargoId: user.values.Cargo
          },
          process.env.SECRET,
          { expiresIn: "8h" }
        );
        res.status(200).json({ success: true,cargo: permissao[0]?.nome_cargo, Token: token });
      } else {
        res.status(406).json({ success: false, message: "Senha invalida" });
      }
    } else {
      user.values = undefined
        ? res
            .status(406)
            .json({ success: false, message: "Usuario não encontrado" })
        : res.status(404).json({ success: false, message: user.error });
    }
  }
}

module.exports = new LoginController();
