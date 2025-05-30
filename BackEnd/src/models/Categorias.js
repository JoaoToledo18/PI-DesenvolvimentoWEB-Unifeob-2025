const knex = require("../config/data");

class Categorias {
  async BuscarTodasCategorias() {
    try {
      let categorias = await knex
        .select(["CategoriaID", "Nome"])
        .table("categorias");
      return { validate: true, values: categorias };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Nome) {
    try {
      await knex
        .insert({
          Nome: Nome,
        })
        .table("categorias");
      return { validate: true };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async alterar(id, Nome) {
        try {
            await knex.update({Nome: Nome}).where({ CategoriaID: id }).table('categorias')
            return { validated: true, message: "Categoria editada com Sucesso!!" }

        } catch (error) {
            return { validated: false, error: error }
        }
  }
  
  async excluir(id) {
      try {
          await knex.delete().where({ CategoriaID: id }).table('categorias')
          return { validated: true, message: "Categoria Excluido com Sucesso!" }
      } catch (error) {
          return { validated: false, error: error }
      }
}



}

module.exports = new Categorias();
