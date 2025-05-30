const mesas = require("../models/Mesas");

class Mesas {
  async retornaTodasMesas(req, res) {
    let resultado = await mesas.BuscarTodasMesas();
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novaMesa(req, res) {
    let { Numero } = req.body;

    let resultado = await mesas.criar(Numero);

    resultado.validate
      ? res.status(201).json({ success: true, message: "Mesa Cadastrado" })
      : res.status(404).json({ success: false, message: resultado.error });
  }

  async editarMesa(req, res) {
    let id = req.params.id;
    let { Numero } = req.body;
    if (isNaN(id)) {
      res.status(404).json({ success: false, message: "Parametro Inválido" });
    } else {
      let result = await mesas.alterar(id, Numero);
      result.validated
        ? res.status(200).json({ success: true, message: result.message })
        : res.status(406).json({ success: false, message: result.error });
    }
  }

  async remover(req, res) {
    let id = req.params.id;
    let result = await mesas.excluir(id);
    result.validated
      ? res.status(200).json({ success: true, message: result.message })
      : res.status(406).json({ success: false, message: result.error });
  }
}

module.exports = new Mesas();
