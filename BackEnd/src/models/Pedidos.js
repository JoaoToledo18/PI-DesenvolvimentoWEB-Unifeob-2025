const knex = require("../config/data");

class Pedidos {
  async BuscarPedidos(Status) {
    try {
      let pedidos = await knex("pedidos")
        .join("mesas", "pedidos.mesas_MesaID", "mesas.MesaID")
        .join("produtos", "pedidos.produtos_ProdutoID", "produtos.ProdutoID")
        .where("pedidos.Status", `${Status}`)
        .select(
          "pedidos.PedidosID",
          "mesas.Numero as NumeroMesa",
          "produtos.Nome as NomeProduto",
          "produtos.Preco",
          "produtos.Descricao",
          "pedidos.DataHora"
        );
      return { validate: true, values: pedidos };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(MesaID, ProdutoID, DataHora) {
    try {
      await knex
        .insert({
          mesas_MesaID: MesaID,
          produtos_ProdutoID: ProdutoID,
          DataHora: DataHora,
          Status: "Fazer"
        })
        .table("pedidos");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async alterarStatus(id, Status) {
    try {
      await knex
        .update({Status: Status})
        .where({ PedidosID: id })
        .table("pedidos");
      return { validated: true, message: "Pedido editado com Sucesso!!" };
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

module.exports = new Pedidos();
