const token = localStorage.getItem("authToken");

axios
  .get(`${API}/cargos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(function (response) {
    const cargos = response.data.values;
    let options = '<option value="">Selecione um cargo</option>';
    cargos.forEach(function (cargo) {
      options += `<option value="${cargo.CargoID}">${cargo.Nome}</option>`;
    });

    document.getElementById("form-funcionario").innerHTML = `
    <form onsubmit="handleFuncionarioSubmit(event)">
      <div class="mb-3">
        <label class="form-label">Nome do Funcionário</label>
        <input type="text" class="form-control" name="nome" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Cargo</label>
        <select class="form-control" name="cargo" required>
          ${options}
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Usuário</label>
        <input type="text" class="form-control" name="usuario" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Senha</label>
        <input type="password" class="form-control" name="senha" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Confirmar Senha</label>
        <input type="password" class="form-control" name="confirmarSenha" required>
      </div>
      <div class="mb-3">
        <label class="form-label">RG</label>
        <input type="text" class="form-control" name="rg" required>
      </div>
      <button type="submit" class="btn btn-success">Salvar Funcionário</button>
    </form>
  `;
  })
  .catch(function () {
    document.getElementById("form-funcionario").innerHTML =
      '<p class="text-danger">Erro ao carregar os cargos.</p>';
  });

function handleFuncionarioSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const senha = form.senha.value;
  const confirmarSenha = form.confirmarSenha.value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  const payload = {
    Nome: form.nome.value,
    Cargo: Number(form.cargo.value),
    Usuario: form.usuario.value,
    Senha: form.senha.value,
    RG: form.rg.value,
  };

  axios
    .post(`${API}/user`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("Funcionário cadastrado com sucesso!");
      form.reset();
    })
    .catch(() => {
      alert("Erro ao cadastrar funcionário!");
    });
}
