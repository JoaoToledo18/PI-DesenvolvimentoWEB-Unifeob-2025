function excluirItem(tipo, id) {
  let rota = "";
  if (tipo === "categoria") rota = `/categorias/${id}`;
  else if (tipo === "mesa") rota = `/mesa/${id}`;
  else if (tipo === "cargo") rota = `/cargo/${id}`;
  else if (tipo === "produto") rota = `/produtos/${id}`;

  if (!confirm("Tem certeza que deseja excluir este item?")) return;

  axios
    .delete(`${API}` + rota, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert(
        `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} excluído com sucesso!`
      );
      if (tipo === "categoria") carregarCategorias();
      else if (tipo === "mesa") carregarMesas();
      else if (tipo === "cargo") carregarCargos();
    })
    .catch((err) => {
      console.error(`Erro ao excluir ${tipo}:`, err);
      alert(`Erro ao excluir ${tipo}`);
    });
}
