export default class AlimentoModel {
  static criaCardAlimento(alimento) {
    const trContainer = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td2.innerText = alimento.nome;
    const td3 = document.createElement("td");
    td3.innerText = alimento.valor.toFixed(2);
    const td4 = document.createElement("td");
    td4.innerText = alimento.quantidade;
    const td5 = document.createElement("td");
    trContainer.append(td1, td2, td3, td4, td5);

    const editBotao = document.createElement("a");
    const deleteBotao = document.createElement("a");
    td5.append(editBotao, deleteBotao);

    editBotao.href = "#editProductModal";
    editBotao.classList.add("edit");
    editBotao.setAttribute("data-toggle", "modal");

    const iconEdit = document.createElement("i");
    editBotao.append(iconEdit);
    iconEdit.classList.add("material-icons");
    iconEdit.setAttribute("data-toggle", "tooltip");
    iconEdit.title = "Editar";
    iconEdit.innerHTML = `&#xE254;`;

    deleteBotao.href = "#deleteProductModal";
    deleteBotao.classList.add("delete");
    deleteBotao.setAttribute("data-toggle", "modal");

    const deleteIcon = document.createElement("i");
    deleteBotao.append(deleteIcon);
    deleteIcon.classList.add("material-icons");
    deleteIcon.setAttribute("data-toggle", "tooltip");
    deleteIcon.title = "Deletar";
    deleteIcon.innerHTML = `&#xE872;`;

    return trContainer;
  }
}
