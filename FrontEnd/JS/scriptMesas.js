async function carregarMesas() {
  try {
    const token = localStorage.getItem("authToken");
    const resposta = await fetch(`${API}/mesas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dados = await resposta.json();

    if (dados.success || dados.sucess) {
      const container = document.getElementById("botoes-mesas");

      dados.values.forEach((mesa) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-primary mesa-btn";
        btn.textContent = "Mesa " + mesa.Numero;

        btn.onclick = () => {
          localStorage.setItem("mesaID", mesa.MesaID);
          window.location.href = "cardapio.html";
        };

        container.appendChild(btn);
      });
    } else {
      alert("Erro ao carregar as mesas.");
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Não foi possível carregar as mesas.");
  }
}

carregarMesas();
