document.getElementById("form-produto").innerHTML = `
<form id="produto-form" onsubmit="handleProdutoSubmit(event)" enctype="multipart/form-data">
    <div class="mb-3">
      <label class="form-label">Nome do Produto</label>
      <input type="text" class="form-control" name="Nome" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Categoria</label>
      <select class="form-control" name="CategoriaID" required>
        <option value="" disabled selected>Selecione a Categoria</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Preço</label>
      <input type="number" class="form-control" name="Preco" step="0.01" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Descrição</label>
      <textarea class="form-control" name="Descricao" required></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Imagem</label>
      <input type="file" class="form-control" name="imagem" accept="image/*">
    </div>
    <button type="submit" class="btn btn-success">Salvar Produto</button>
  </form>
`;

function showForm(formName) {
  const forms = document.querySelectorAll("#forms > div");
  forms.forEach((div) => div.classList.add("d-none"));
  const formDiv = document.getElementById("form-" + formName);
  formDiv.classList.remove("d-none");

  if (formName === "produto") {
    const token = localStorage.getItem("authToken");

    axios
      .get(`${API}/categorias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          const selectCategoria = formDiv.querySelector(
            'select[name="CategoriaID"]'
          );
          response.data.values.forEach((categoria) => {
            const option = document.createElement("option");
            option.value = categoria.CategoriaID;
            option.textContent = categoria.Nome;
            selectCategoria.appendChild(option);
          });
        } else {
          alert("Nenhuma categoria disponível");
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar categorias:", error);
        alert("Erro ao carregar categorias");
      });
  }
}

function handleProdutoSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const token = localStorage.getItem("authToken");

  axios
    .post(`${API}/produto`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => alert("Produto cadastrado com sucesso!"))
    .catch(() => alert("Erro ao cadastrar produto!"));

  form.reset();
}
