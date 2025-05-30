const knex = require("../config/data");

class Mesas {
  async BuscarTodasMesas() {
    try {
      let mesas = await knex
        .select(["MesaID", "Numero"])
        .table("mesas");
      return { validate: true, values: mesas };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Numero) {
    try {
      await knex
        .insert({
          Numero: Numero,
        })
        .table("mesas");
      return { validate: true };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async alterar(id, Numero) {
    try {
        await knex.update({Numero: Numero}).where({ MesaID: id }).table('mesas')
        return { validated: true, message: "Mesa editada com Sucesso!!" }

    } catch (error) {
        return { validated: false, error: error }
    }
}

async excluir(id) {
  try {
      await knex.delete().where({ MesaID: id }).table('mesas')
      return { validated: true, message: "Mesa Excluido com Sucesso!" }
  } catch (error) {
      return { validated: false, error: error }
  }
}
}

module.exports = new Mesas();