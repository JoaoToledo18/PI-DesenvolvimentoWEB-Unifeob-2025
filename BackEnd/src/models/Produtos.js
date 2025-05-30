const knex = require("../config/data");

class Produtos {
  async BuscarPorCategoria(CategoriaID) {
    try {
      let produtos = await knex
        .select([
          "ProdutoID",
          "Nome",
          "CategoriaID",
          "Preco",
          "IMG",
          "Descricao",
        ])
        .where({ CategoriaID: CategoriaID })
        .table("produtos");

      return produtos.length > 0
        ? { validate: true, values: produtos }
        : { validate: false, values: undefined };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async buscarUmPorID(id) {
    try {
      let produto = await knex
        .select([
          "ProdutoID",
          "Nome",
          "CategoriaID",
          "Preco",
          "IMG",
          "Descricao",
        ])
        .where({ ProdutoID: id })
        .table("produtos");
      return produto.length > 0
        ? { validate: true, values: produto }
        : { validate: true, values: undefined };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Nome, CategoriaID, Preco, IMG, Descricao) {
    try {
      let produto = await knex
        .insert({
          Nome: Nome,
          CategoriaID: CategoriaID,
          Preco: Preco,
          IMG: IMG,
          Descricao: Descricao,
        })
        .table("produtos");

      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async retornarTodos() {
    try {
      let produtos = await knex
        .select([
          "ProdutoID",
          "Nome",
          "CategoriaID",
          "Preco",
          "IMG",
          "Descricao",
        ])
        .table("produtos");

      return produtos.length > 0
        ? { validate: true, values: produtos }
        : { validate: false, values: undefined };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async alterarProduto(id,Nome,CategoriaID,Preco,IMG,Descricao) {
    try {
      await knex
        .update({ "Nome":Nome,
          "CategoriaID":CategoriaID,
          "Preco":Preco,
          "IMG":IMG,
          "Descricao":Descricao })
        .where({ ProdutoID: id })
        .table("produtos");
      return { validated: true, message: "Produto editado com Sucesso!!" };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Produtos();
