const cargo = localStorage.getItem("CargoHamburgueria");

if (!cargo) {
  alert("Cargo não encontrado. Faça login.");
} else {
  const botoes = [
    { nome: "Adicionar", permissoes: ["Admin"], linha: "linha-admin" },
    { nome: "AtualizarRemover", permissoes: ["Admin"], linha: "linha-admin" },
    {
      nome: "Pedidos",
      permissoes: ["Admin", "Cozinheiro"],
      linha: "linha-cozinheiro",
    },
    {
      nome: "Entregas",
      permissoes: ["Admin", "Garçom"],
      linha: "linha-garcom",
    },
    {
      nome: "Pagamentos",
      permissoes: ["Admin", "Caixa"],
      linha: "linha-caixa",
    },
  ];

  botoes.forEach((botao) => {
    if (botao.permissoes.includes(cargo)) {
      const wrapper = document.createElement("div");
      wrapper.className = "btn-wrapper";

      const btn = document.createElement("button");
      btn.textContent = botao.nome;
      btn.classList.add("btn", "btn-outline-primary", "btn-fill");
      btn.onclick = () => (window.location.href = `./${botao.nome}.html`);

      wrapper.appendChild(btn);
      document.getElementById(botao.linha).appendChild(wrapper);
    }
  });

  ["admin", "garcom", "cozinheiro", "caixa"].forEach((tipo) => {
    const linha = document.getElementById(`linha-${tipo}`);
    const card = document.getElementById(`card-${tipo}`);
    if (linha.children.length === 0) {
      card.style.display = "none";
    }
  });
}

document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("CargoHamburgueria");
  localStorage.removeItem("authToken");

  alert("Você foi desconectado!");
  window.location.href = "../index.html";
});
