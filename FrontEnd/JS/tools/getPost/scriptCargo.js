document.getElementById("form-cargo").innerHTML = `
  <form onsubmit="handleCargoSubmit(event)">
    <div class="mb-3">
      <label class="form-label">Nome do Cargo</label>
      <input type="text" class="form-control" name="nome" required>
    </div>
    <div class="mb-3">
      <label class="form-label">Descrição da Função</label>
      <input type="text" class="form-control" name="descricao" required>
    </div>
    <button type="submit" class="btn btn-success">Salvar Cargo</button>
  </form>
`;

function handleCargoSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const token = localStorage.getItem("authToken");

  axios
    .post(
      `${API}/cargo`,
      {
        Nome: data.nome,
        Descricao: data.descricao,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => alert("Cargo cadastrado com sucesso!"))
    .catch(() => alert("Erro ao cadastrar cargo!"));

  form.reset();
}
