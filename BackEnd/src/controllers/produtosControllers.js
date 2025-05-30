const produtos = require("../models/Produtos");

class ProdutosControllers {
  async retornaPorCategoria(req, res) {
    let resultado = await produtos.BuscarPorCategoria(req.params.id);
    if (!resultado.validate) {
      return res.status(404).json({ success: false, message: resultado.error });
    }
    return res.status(200).json({ success: true, values: resultado.values });
  }

  async retornaTodosProdutos(req, res) {
    let resultado = await produtos.retornarTodos();
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async retornaUm(req, res) {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    let resultado = await produtos.buscarUmPorID(req.params.id);
    if (!resultado.validate) {
      return res.status(404).json({ success: false, message: resultado.error });
    }
    if (resultado.values === undefined) {
      return res
        .status(406)
        .json({ success: false, message: "Produto não encontrado" });
    }
    return res.status(200).json({ success: true, values: resultado.values });
  }

  async criarProduto(req, res) {
    let { Nome, CategoriaID, Preco, Descricao } = req.body;
    let IMG = req.file ? req.file.filename : null;

    if (!Nome || !CategoriaID || !Preco || !Descricao || !IMG) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios.",
      });
    }

    let result = await produtos.criar(Nome, CategoriaID, Preco, IMG, Descricao);

    result.validated
      ? res.status(201).json({ success: true, message: "Produto Cadastrado" })
      : res.status(404).json({ success: false, message: result.error });
  }

  async alterar(req, res) {
    let id = req.params.id;
    let { Nome, CategoriaID,Preco,Descricao} = req.body;
    let IMG = req.file ? req.file.filename : null;
    if (isNaN(id)) {
      res.status(404).json({ success: false, message: "Parametro Inválido" });
    } else {
      let result = await produtos.alterarProduto(id,Nome,CategoriaID,Preco,IMG,Descricao);
      result.validated
        ? res.status(200).json({ success: true, message: result.message })
        : res.status(406).json({ success: false, message: result.error });
    }
  }
}

module.exports = new ProdutosControllers();
