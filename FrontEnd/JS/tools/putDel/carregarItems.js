let categoriasDisponiveis = [];

function carregarProdutos() {
  axios
    .get(`${API}/categorias`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((catRes) => {
      const categorias = catRes.data.values;

      return axios
        .get(`${API}/produtos`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const lista = document.getElementById("lista-produtos");
          lista.innerHTML = "";
          res.data.values.forEach((produto) => {
            const col = criarInputGrupo(
              produto.ProdutoID,
              [
                { label: "Nome", name: "nome", value: produto.Nome },
                {
                  label: "Categoria",
                  name: "categoria",
                  value: produto.CategoriaID,
                  type: "select",
                },
                { label: "Preço", name: "preco", value: produto.Preco },
                {
                  label: "Descrição",
                  name: "descricao",
                  value: produto.Descricao,
                },
                {
                  label: "Imagem",
                  name: "img",
                  type: "file",
                  imgUrl: produto.IMG
                    ? `../../BackEnd/src/uploads/images/${produto.IMG}`
                    : null,
                },
              ],
              "produto",
              categorias
            );
            lista.appendChild(col);
          });
        });
    })
    .catch((err) => console.error("Erro ao carregar produtos:", err));
}

function carregarCategorias() {
  axios
    .get(`${API}/categorias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const lista = document.getElementById("lista-categorias");
      lista.innerHTML = "";
      res.data.values.forEach((cat) => {
        const col = criarInputGrupo(
          cat.CategoriaID,
          [{ label: "Nome da Categoria", name: "nome", value: cat.Nome }],
          "categoria"
        );
        lista.appendChild(col);
      });
    })
    .catch((err) => console.error("Erro ao carregar categorias:", err));
}
function carregarMesas() {
  axios
    .get(`${API}/mesas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const lista = document.getElementById("lista-mesas");
      lista.innerHTML = "";
      res.data.values.forEach((mesa) => {
        const col = criarInputGrupo(
          mesa.MesaID,
          [
            {
              label: "Número da Mesa",
              name: "numero",
              value: mesa.Numero,
            },
          ],
          "mesa"
        );
        lista.appendChild(col);
      });
    })
    .catch((err) => console.error("Erro ao carregar mesas:", err));
}

function carregarCargos() {
  axios
    .get(`${API}/cargos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const lista = document.getElementById("lista-cargos");
      lista.innerHTML = "";
      res.data.values.forEach((cargo) => {
        const col = criarInputGrupo(
          cargo.CargoID,
          [
            { label: "Nome do Cargo", name: "nome", value: cargo.Nome },
            {
              label: "Descrição",
              name: "descricao",
              value: cargo.Descricao,
            },
          ],
          "cargo"
        );
        lista.appendChild(col);
      });
    })
    .catch((err) => console.error("Erro ao carregar cargos:", err));
}
