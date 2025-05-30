const cargos = require("../models/Cargos");

class Cargos {
  async retornaTodosCargos(req, res) {
    let resultado = await cargos.BuscarTodosCargos();
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novoCargo(req, res) {
    let { Nome, Descricao } = req.body;

    let result = await cargos.criar(Nome, Descricao);

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Cargo Cadastrado com Sucesso" })
      : res.status(404).json({ success: false, message: result.error });
  }

  async editarCargo(req, res) {
    let id = req.params.id;
    let { Nome, Descricao } = req.body;
    if (isNaN(id)) {
      res.status(404).json({ success: false, message: "Parametro Inválido" });
    } else {
      let result = await cargos.alterar(id, Nome, Descricao);
      result.validated
        ? res.status(200).json({ success: true, message: result.message })
        : res.status(406).json({ success: false, message: result.error });
    }
  }

  async remover(req, res) {
    let id = req.params.id;
    let result = await cargos.excluir(id);
    result.validated
      ? res.status(200).json({ success: true, message: result.message })
      : res.status(406).json({ success: false, message: result.error });
  }
}

module.exports = new Cargos();
