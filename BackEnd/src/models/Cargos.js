const knex = require("../config/data");

class Cargos {
  async BuscarTodosCargos() {
    try {
      let cargos = await knex
        .select(["CargoID", "Nome", "Descricao"])
        .table("cargos");
      return { validate: true, values: cargos };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Nome, Descricao) {
    try {
      await knex.insert({ Nome: Nome, Descricao: Descricao }).table("cargos");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async alterar(id, Nome, Descricao) {
    try {
      await knex
        .update({ Nome: Nome, Descricao: Descricao })
        .where({ CargoID: id })
        .table("cargos");
      return { validated: true, message: "Cargo editado com Sucesso!!" };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async excluir(id) {
    try {
      await knex.delete().where({ CargoID: id }).table("cargos");
      return { validated: true, message: "Cargo Excluido com Sucesso!" };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Cargos();
