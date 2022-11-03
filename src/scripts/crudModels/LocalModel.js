import { locais } from "../arrayTest/produtos.js";
import { closeModal } from "./setOpenCloseModal.js";
import { Atualizacao } from "./AtualizacaoModel.js";
const companyId = JSON.parse(localStorage.getItem("@CURRENT_COMPANY")).id;

export default class LocalModel {
  static modalDeleteID = "#deleteProductModal";
  static modalUpdateID = "#editProductModal";
  static modalCreateID = "#addProductModal";
  static currentProduct = {};
  static deleteBtn;
  static criaCardLocal(localParam) {
    const local = { ...localParam };
    local.tipo = "local";

    const trContainer = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td2.innerText = local.nome;
    const td3 = document.createElement("td");
    td3.innerText = local.valor.toFixed(2);
    const td4 = document.createElement("td");
    td4.innerText = local.endereco;
    const td5 = document.createElement("td");
    trContainer.append(td1, td2, td3, td4, td5);
    const editBotao = document.createElement("a");
    editBotao.setAttribute("id", `${JSON.stringify(local)}`);
    editBotao.addEventListener("click", this.editaLocal);

    const deleteBotao = document.createElement("a");
    deleteBotao.setAttribute("id", `${JSON.stringify(local)}`);
    deleteBotao.addEventListener("click", this.deletaLocal);
    td5.append(editBotao, deleteBotao);

    editBotao.href = "#editProductModalLocal";
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

  static async populaLocais() {
    const containerLocais = document.getElementById("container-locais--");
    containerLocais.innerHTML = "";

    const localReq = await fetch(
      "https://expresso-fiesta.herokuapp.com/empresa/localList/" + companyId
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((er) => console.error(er));
    localReq.forEach((el) => {
      containerLocais.appendChild(this.criaCardLocal(el));
    });
  }

  static async deletaLocal(e) {
    const obj = JSON.parse(e.currentTarget.id);
    const botaoExcluir = document.getElementById("botao-excluir");
    LocalModel.currentProduct = obj;
    botaoExcluir.addEventListener("click", LocalModel.performaDelecao);
    LocalModel.deleteBtn = botaoExcluir;
  }

  static async performaDelecao() {
    LocalModel.deleteBtn.removeEventListener("click", LocalModel.performaDelecao, false);
    // const id = LocalModel.currentProduct.id;
    // const idx = locais.findIndex((el) => el.id == id);
    // locais.splice(idx, 1);
    await fetch(
      "https://expresso-fiesta.herokuapp.com/local/delete/" + LocalModel.currentProduct.id,
      {
        method: "POST",
      }
    );

    await LocalModel.populaLocais();
    closeModal(LocalModel.modalDeleteID);
  }

  static editaLocal(e) {
    e.preventDefault();
    const obj = JSON.parse(e.currentTarget.id);
    Atualizacao.AtualizacaoLocal(obj);
  }
}
