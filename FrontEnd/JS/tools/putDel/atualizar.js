function atualizarItem(tipo, id, inputs) {
  let rota = "";
  let dados = {};

  if (tipo === "categoria") {
    rota = `/categorias/${id}`;
    dados = { Nome: inputs.nome.value };
  } else if (tipo === "mesa") {
    rota = `/mesa/${id}`;
    dados = { Numero: inputs.numero.value };
  } else if (tipo === "cargo") {
    rota = `/cargo/${id}`;
    dados = {
      Nome: inputs.nome.value,
      Descricao: inputs.descricao.value,
    };
  } else if (tipo === "produto") {
    rota = `/produto/${id}`;
    dados = new FormData();
    dados.append("Nome", inputs.nome.value);
    dados.append("CategoriaID", inputs.categoria.value);
    dados.append("Preco", inputs.preco.value);
    dados.append("Descricao", inputs.descricao.value);

    if (inputs.img.files.length > 0) {
      dados.append("IMG", inputs.img.files[0]);
    }

    axios
      .put(`${API}${rota}`, dados, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Produto atualizado com sucesso!");
        carregarProdutos();
      })
      .catch((err) => {
        console.error("Erro ao atualizar produto:", err);
        alert("Erro ao atualizar produto");
      });
  }
}
