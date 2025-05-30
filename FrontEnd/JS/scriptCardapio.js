const carrinho = [];
let produtoSelecionado = null;

async function carregarCategorias() {
  try {
    const resposta = await fetch(`${API}/categorias`);
    const dados = await resposta.json();

    if (dados.success || dados.sucess) {
      const menuContainer = document.getElementById("menu-categorias");

      dados.values.forEach((categoria) => {
        const itemMenu = document.createElement("li");
        itemMenu.className = "list-group-item";
        itemMenu.textContent = categoria.Nome;
        itemMenu.onclick = () => {
          carregarProdutos(categoria.CategoriaID);
          fecharMenu();
        };
        menuContainer.appendChild(itemMenu);
      });
    } else {
      alert("Erro ao carregar categorias.");
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Não foi possível carregar as categorias.");
  }
}

async function carregarProdutos(categoriaID) {
  try {
    document.getElementById("mensagem-boas-vindas").classList.add("d-none");
    document.getElementById("produtos-container").classList.remove("d-none");

    const resposta = await fetch(`${API}/produtos/${categoriaID}`);
    const dados = await resposta.json();

    if (dados.success || dados.sucess) {
      const produtosContainer = document.getElementById("produtos-container");
      produtosContainer.innerHTML = "";

      dados.values.forEach((produto) => {
        const produtoCard = document.createElement("div");
        produtoCard.className = "col-md-4 col-sm-6 mb-4";
        produtoCard.innerHTML = `
<div class="card bg-dark text-white">
  <img 
    src="${API}/uploads/images/${produto.IMG}" 
    class="card-img-top object-fit-cover"
    style= "height: 40vh"
    alt="${produto.Nome}">
  <div class="card-body">
    <h5 class="card-title">${produto.Nome}</h5>
    <p class="card-text">Preço: R$ ${produto.Preco}</p>
    <button 
      class="btn btn-primary" 
      onclick='mostrarDetalhesProduto(${JSON.stringify(produto)})'>
      Ver Detalhes/Adicionar
    </button>
  </div>
</div>
        `;
        produtosContainer.appendChild(produtoCard);
      });
    } else {
      alert("Erro ao carregar produtos.");
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Não foi possível carregar os produtos.");
  }
}

function fecharMenu() {
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  sidebar.classList.remove("active");
  content.classList.remove("active");
}

document.getElementById("menu-toggle").onclick = () => {
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  sidebar.classList.toggle("active");
  content.classList.toggle("active");
};

carregarCategorias();

function mostrarDetalhesProduto(produto) {
  produtoSelecionado = produto;

  document.getElementById("produtoModalLabel").textContent = produto.Nome;
  document.getElementById(
    "produtoModalImg"
  ).src = `../../BackEnd/src/uploads/images/${produto.IMG}`;
  document.getElementById("produtoModalImg").alt = produto.Nome;
  document.getElementById("produtoModalNome").textContent =
    "Nome: " + produto.Nome;
  document.getElementById("produtoModalDescr").textContent = produto.Descricao;
  document.getElementById("produtoModalPreco").textContent =
    "Preço: R$ " + produto.Preco;

  const modal = new bootstrap.Modal(document.getElementById("produtoModal"));
  modal.show();
}

document
  .getElementById("btnAdicionarAoCarrinho")
  .addEventListener("click", () => {
    if (produtoSelecionado) {
      carrinho.push(produtoSelecionado);
      alert(`${produtoSelecionado.Nome} foi adicionado ao carrinho!`);

      const modalElement = document.getElementById("produtoModal");
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  });

document.getElementById("finalizar-pedido").addEventListener("click", () => {
  const resumoBody = document.getElementById("resumoPedidoBody");
  resumoBody.innerHTML = "";

  if (carrinho.length === 0) {
    resumoBody.innerHTML = "<p>O carrinho está vazio.</p>";
  } else {
    const lista = document.createElement("ul");
    lista.className = "list-group";

    let total = 0;

    carrinho.forEach((produto, index) => {
      const item = document.createElement("li");
      item.className =
        "list-group-item bg-dark text-white d-flex justify-content-between align-items-center";
      item.innerHTML = `
        <div>
          <strong>${produto.Nome}</strong><br>
          R$ ${produto.Preco}
        </div>
        <button class="btn btn-danger btn-sm" onclick="removerItemResumo(${index})">X</button>
      `;
      lista.appendChild(item);
      total += parseFloat(produto.Preco);
    });

    const totalItem = document.createElement("li");
    totalItem.className =
      "list-group-item bg-dark text-white d-flex justify-content-between align-items-center";
    totalItem.innerHTML = `<strong>Total:</strong> <span>R$ ${total.toFixed(
      2
    )}</span>`;
    lista.appendChild(totalItem);

    resumoBody.appendChild(lista);
  }

  const modal = new bootstrap.Modal(
    document.getElementById("finalizarPedidoModal")
  );
  modal.show();
});

function removerItemResumo(index) {
  carrinho.splice(index, 1);
  document.getElementById("finalizar-pedido").click();
}

document.getElementById("confirmarPedido").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Não há itens no carrinho.");
    return;
  }

  carrinho.forEach(async (pedido) => {
    const mesaID = localStorage.getItem("mesaID");

    try {
      const response = await axios.post(`${API}/pedidos`, {
        MesaID: mesaID,
        ProdutoID: pedido.ProdutoID,
      });
      alert("Pedido cadastrado");
    } catch (error) {
      alert("falha ao cadastrar pedido");
    }
  });

  alert("Pedido finalizado com sucesso!");

  carrinho.length = 0;

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("finalizarPedidoModal")
  );
  modal.hide();
});
