const knex = require("../config/data");

class Users {
  async buscarTodos() {
    try {
      let users = await knex
        .select(["FuncionarioID", "Nome", "Cargo", "Usuario", "Senha", "RG"])
        .table("funcionarios");
      return { validate: true, values: users };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async buscarUmPorID(id) {
    try {
      let user = await knex
        .select(["FuncionarioID", "Nome", "Cargo", "Usuario", "Senha", "RG"])
        .where({ FuncionarioID: id })
        .table("funcionarios");
      return user.length > 0
        ? { validate: true, values: user }
        : { validate: true, values: undefined };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Nome, Cargo, Usuario, Senha, RG) {
    try {
      await knex
        .insert({
          Nome: Nome,
          Cargo: Cargo,
          Usuario: Usuario,
          Senha: Senha,
          RG: RG,
        })
        .table("funcionarios");
      return { validate: true };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async BuscarPorUsuario(Usuario) {
    try {
      let user = await knex
        .select(["FuncionarioID", "Nome", "Cargo", "Usuario", "Senha", "RG"])
        .where({ Usuario: Usuario })
        .table("funcionarios");

      return user.length > 0
        ? { validate: true, values: user[0] }
        : { validate: false, values: undefined };
    } catch (error) {
      return { validate: false, error: error };
    }
  }
}

module.exports = new Users();
