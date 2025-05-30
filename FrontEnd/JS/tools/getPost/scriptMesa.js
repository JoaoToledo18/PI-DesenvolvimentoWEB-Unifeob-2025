document.getElementById("form-mesa").innerHTML = `
  <form id="mesa-form">
    <div class="mb-3">
      <label class="form-label">Número da Mesa</label>
      <input type="number" class="form-control" name="numero" required>
    </div>
    <button type="submit" class="btn btn-success">Salvar Mesa</button>
  </form>
`;

document
  .getElementById("mesa-form")
  .addEventListener("submit", handleMesaSubmit);

function handleMesaSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const numero = parseInt(form.numero.value);

  if (isNaN(numero)) {
    alert("Número inválido!");
    return;
  }

  const token = localStorage.getItem("authToken");

  axios
    .post(
      `${API}/mesa`,
      { Numero: numero },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.data.success) {
        alert(response.data.message);
        form.reset();
      } else {
        alert("Erro: " + response.data.message);
      }
    })
    .catch((error) => {
      alert("Erro ao cadastrar mesa!");
      console.error(error);
    });
}
