document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuario = document.getElementById("username").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagemErro = document.getElementById("mensagemErro");
    mensagemErro.textContent = "";

    try {
      const response = await axios.post(`${API}/login`, {
        Usuario: usuario,
        Senha: senha,
      });
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.Token);
        localStorage.setItem("CargoHamburgueria", response.data.cargo);
        window.location.href = "./pages/gerenciamentoFunc.html";
      } else {
        mensagemErro.textContent =
          response.data.message || "Erro na autenticação.";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        mensagemErro.textContent = error.response.data.message;
      } else {
        mensagemErro.textContent = "Usuario não existente";
      }
      console.error("Erro ao realizar o login:", error);
    }
  });
