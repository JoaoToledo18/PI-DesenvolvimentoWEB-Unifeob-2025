const categoria = require("../models/Categorias");

class Categorias {
  async retornaTodasCategorias(req, res) {
    let resultado = await categoria.BuscarTodasCategorias();
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novaCategoria(req, res) {
    let {Nome} = req.body;

    let resultado = await categoria.criar(
      Nome
    );

    resultado.validate
      ? res
          .status(201)
          .json({ success: true, message: "Categoria Cadastrado" })
      : res.status(404).json({ success: false, message: resultado.error });
  }

  async editarCategoria(req,res){
    let id = req.params.id
    let {Nome} = req.body
    if(isNaN(id)){
        res.status(404).json({success: false, message: "Parametro Inválido"})
    }else{
        let result = await categoria.alterar(id,Nome)
        result.validated
        ? res.status(200).json({success: true, message: result.message})
        : res.status(406).json({success: false, message: result.error}) 
    }
}

  async remover(req, res){
    let id = req.params.id
        let result = await categoria.excluir(id)
        result.validated
        ? res.status(200).json({success: true, message: result.message})
        : res.status(406).json({success: false, message: result.error}) 
  }

}

module.exports = new Categorias();