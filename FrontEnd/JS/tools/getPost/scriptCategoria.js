document.getElementById("form-categoria").innerHTML = `
  <form onsubmit="handleCategoriaSubmit(event)">
    <div class="mb-3">
      <label class="form-label">Nome da Categoria</label>
      <input type="text" class="form-control" name="nome" required>
    </div>
    <button type="submit" class="btn btn-success">Salvar Categoria</button>
  </form>
`;

function handleCategoriaSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const token = localStorage.getItem("authToken");

  axios
    .post(
      `${API}/categoria`,
      { Nome: data.nome },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => alert("Categoria cadastrada com sucesso!"))
    .catch(() => alert("Erro ao cadastrar categoria!"));

  form.reset();
}
