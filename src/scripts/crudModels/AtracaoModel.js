import { atracoes } from "../arrayTest/produtos.js";
import { closeModal } from "./setOpenCloseModal.js";

export default class AtracaoModel {
  static modalDeleteID = "#deleteProductModal";
  static modalUpdateID = "#editProductModal";
  static modalCreateID = "#addProductModal";
  static currentProduct = {};
  static criaCardAtracao(atracao) {
    

    atracao.tipo = 'atracao'

    const trContainer = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td2.innerText = atracao.nome;
    const td3 = document.createElement("td");
    td3.innerText = atracao.valor.toFixed(2);
   
    const td5 = document.createElement("td");
    trContainer.append(td1, td2, td3, td5);

    const editBotao = document.createElement("a");
    editBotao.setAttribute("id", `${JSON.stringify(atracao)}`);
    editBotao.addEventListener("click", this.editaAtracao);

    const deleteBotao = document.createElement("a");
    deleteBotao.setAttribute("id", `${JSON.stringify(atracao)}`);
    deleteBotao.addEventListener("click", this.deletaAtracao);


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

  static populaAtracao() {
    const containerAtracoes = document.getElementById(
      "container-atracoes--");
    containerAtracoes.innerHTML = "";

    atracoes.forEach((el) => {
      containerAtracoes.appendChild(this.criaCardAtracao(el));
    });
  }

  static deletaAtracao(e) {
    const obj = JSON.parse(e.currentTarget.id);
    const botaoExcluir = document.getElementById("botao-excluir");
    AtracaoModel.currentProduct = obj;
    botaoExcluir.addEventListener("click", AtracaoModel.performaDelecao);
  }
  static performaDelecao() {
    const id = AtracaoModel.currentProduct.id;
    const idx = atracoes.findIndex((el) => el.id == id);
    atracoes.splice(idx, 1);
    AtracaoModel.populaAtracao();
    closeModal(AtracaoModel.modalDeleteID);
  }

  static editaAtracao(e) {
    e.preventDefault();
    const obj = JSON.parse(e.currentTarget.id)
  }

}
