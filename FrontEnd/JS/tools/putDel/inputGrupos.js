function criarInputGrupoProduto(produto) {
  const col = document.createElement("div");
  col.className = "col-md-6";

  const card = document.createElement("div");
  card.className = "card p-3";

  const campos = [
    { label: "Nome", name: "nome", value: produto.Nome },
    { label: "Descrição", name: "descricao", value: produto.Descricao },
    { label: "Preço", name: "preco", value: produto.Preco },
  ];

  const inputs = {};

  campos.forEach((campo) => {
    const inputGroup = document.createElement("div");
    inputGroup.className = "mb-2";
    const label = document.createElement("label");
    label.className = "form-label";
    label.textContent = campo.label;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.name = campo.name;
    input.value = campo.value;
    inputGroup.appendChild(label);
    inputGroup.appendChild(input);
    card.appendChild(inputGroup);
    inputs[campo.name] = input;
  });

  const categoriaGroup = document.createElement("div");
  categoriaGroup.className = "mb-2";
  const labelCategoria = document.createElement("label");
  labelCategoria.className = "form-label";
  labelCategoria.textContent = "Categoria";
  const selectCategoria = document.createElement("select");
  selectCategoria.className = "form-select";
  selectCategoria.name = "categoria";

  categoriasDisponiveis.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.CategoriaID;
    option.textContent = cat.Nome;
    if (cat.CategoriaID === produto.CategoriaID) option.selected = true;
    selectCategoria.appendChild(option);
  });

  categoriaGroup.appendChild(labelCategoria);
  categoriaGroup.appendChild(selectCategoria);
  card.appendChild(categoriaGroup);
  inputs["categoria"] = selectCategoria;

  const botoesContainer = document.createElement("div");
  botoesContainer.className = "d-flex gap-2";

  const botaoAtualizar = document.createElement("button");
  botaoAtualizar.className = "btn btn-success w-50";
  botaoAtualizar.textContent = "Atualizar";
  botaoAtualizar.onclick = () =>
    atualizarItem("produto", produto.ProdutoID, inputs);

  const botaoExcluir = document.createElement("button");
  botaoExcluir.className = "btn btn-danger w-50";
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.onclick = () => excluirItem("produto", produto.ProdutoID);

  botoesContainer.appendChild(botaoAtualizar);
  botoesContainer.appendChild(botaoExcluir);

  card.appendChild(botoesContainer);
  col.appendChild(card);
  return col;
}
function criarInputGrupo(id, campos, tipo, categorias = []) {
  const col = document.createElement("div");
  col.className = "col-md-6";

  const card = document.createElement("div");
  card.className = "card p-3";

  const inputs = {};

  campos.forEach((campo) => {
    const inputGroup = document.createElement("div");
    inputGroup.className = "mb-2";

    const label = document.createElement("label");
    label.className = "form-label";
    label.textContent = campo.label;

    let input;

    if (campo.type === "select") {
      input = document.createElement("select");
      input.className = "form-select";
      categorias.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.CategoriaID;
        option.textContent = cat.Nome;
        if (cat.CategoriaID === campo.value) {
          option.selected = true;
        }
        input.appendChild(option);
      });
    } else if (campo.type === "file") {
      if (campo.imgUrl) {
        const img = document.createElement("img");
        img.src = campo.imgUrl;
        img.alt = "Imagem do Produto";
        img.style.maxWidth = "60%";
        img.style.maxHeight = "60%";
        img.style.height = "auto";
        img.className = "mb-2 rounded border";
        card.appendChild(img);
      }

      input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.className = "form-control";
    } else if (campo.name === "descricao") {
      input = document.createElement("textarea");
      input.className = "form-control";
      input.name = campo.name;
      input.value = campo.value;
      input.rows = 3;
    } else {
      input = document.createElement("input");
      input.type = campo.inputType || "text";
      input.className = "form-control";
      input.value = campo.value;
    }

    input.name = campo.name;
    inputs[campo.name] = input;

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);
    card.appendChild(inputGroup);
  });

  const botoesContainer = document.createElement("div");
  botoesContainer.className = "d-flex gap-2";

  const botaoAtualizar = document.createElement("button");
  botaoAtualizar.className = "btn btn-success w-50";
  botaoAtualizar.textContent = "Atualizar";
  botaoAtualizar.onclick = () => atualizarItem(tipo, id, inputs);

  const botaoExcluir = document.createElement("button");
  botaoExcluir.className = "btn btn-danger w-50";
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.onclick = () => excluirItem(tipo, id);

  botoesContainer.appendChild(botaoAtualizar);
  botoesContainer.appendChild(botaoExcluir);

  card.appendChild(botoesContainer);
  col.appendChild(card);
  return col;
}
