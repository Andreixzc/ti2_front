import { alimentos } from "../arrayTest/produtos.js";
import { closeModal } from "./setOpenCloseModal.js";
export default class AlimentoModel {
  static modalDeleteID = "#deleteProductModal";
  static modalUpdateID = "#editProductModal";
  static modalCreateID = "#addProductModal";
  static currentProduct = {};
  static deleteBtn;

  static criaCardAlimento(alimentoParam) {
    const alimento = { ...alimentoParam };
    alimento.tipo = "alimento";
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
    editBotao.setAttribute("id", `${JSON.stringify(alimento)}`);
    editBotao.addEventListener("click", this.editaAlimento);

    const deleteBotao = document.createElement("a");
    deleteBotao.setAttribute("id", `${JSON.stringify(alimento)}`);
    deleteBotao.addEventListener("click", this.deletaAlimento);

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

  static populaAlimentos() {
    const containerAlimentos = document.getElementById("container-alimentos--");
    containerAlimentos.innerHTML = "";
    // fazer requisicao de get aqui armazenar os dados atualizados
    alimentos.forEach((el) => {
      containerAlimentos.appendChild(this.criaCardAlimento(el));
    });
  }

  static deletaAlimento(e) {
    const obj = JSON.parse(e.currentTarget.id);
    const botaoExcluir = document.getElementById("botao-excluir");
    AlimentoModel.currentProduct = obj;
    botaoExcluir.addEventListener("click", AlimentoModel.performaDelecao);
    AlimentoModel.deleteBtn = botaoExcluir;
  }
  static async performaDelecao() {
    AlimentoModel.deleteBtn.removeEventListener("click", AlimentoModel.performaDelecao, false);
    const id = AlimentoModel.currentProduct.id;
    const idx = alimentos.findIndex((el) => el.id == id);
    console.log(idx);
    // aqui sera necessario esperar terminar o delete e fazer
    // o get denovo nos produtos
    await alimentos.splice(idx, 1);

    await AlimentoModel.populaAlimentos();
    closeModal(AlimentoModel.modalDeleteID);
  }

  static editaAlimento(e) {
    e.preventDefault();
    const obj = JSON.parse(e.currentTarget.id);
  }
}
