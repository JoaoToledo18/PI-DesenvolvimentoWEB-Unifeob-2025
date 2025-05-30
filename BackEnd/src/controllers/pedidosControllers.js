const pedidos = require("../models/Pedidos");
const getDataHoraAtual = require("../service/dateTime_Now_service")

class Pedidos {
  async retornaPedido(req, res) {

    let resultado = await pedidos.BuscarPedidos(req.params.status);
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novoPedido(req, res) {
    let { MesaID,ProdutoID} = req.body;
    const dataHora = getDataHoraAtual()
    let result = await pedidos.criar(MesaID,ProdutoID,dataHora);

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Pedido Realizado com Sucesso" })
      : res.status(404).json({ success: false, message: result.error });
  }

  async editarPedido(req, res) {
    let id = req.params.id;
    let {Status} = req.body;
    if (isNaN(id)) {
      res.status(404).json({ success: false, message: "Parametro Inválido" });
    } else {
      let result = await pedidos.alterarStatus(id,Status);
      result.validated
        ? res.status(200).json({ success: true, message: result.message })
        : res.status(406).json({ success: false, message: result.error });
    }
  }

  async remover(req, res) {
    let id = req.params.id;
    let result = await cargo.excluir(id);
    result.validated
      ? res.status(200).json({ success: true, message: result.message })
      : res.status(406).json({ success: false, message: result.error });
  }
}

module.exports = new Pedidos();
