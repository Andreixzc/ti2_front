import AlimentoModel from "./ALimentoModel.js";
import AtracaoModel from "./AtracaoModel.js";
import LocalModel from "./LocalModel.js";
import { closeModal } from "./setOpenCloseModal.js";

const companyId = JSON.parse(localStorage.getItem("@CURRENT_COMPANY")).id;
export class Registro {
  static modalAlimentoId = "#addProductModalAlimento";
  static modalAtracaoId = "#addProductModalAtracao";
  static modalLocalId = "#addProductModalLocal";

  static ALimentoVar = document.getElementById("alimento-c-tag");
  static AtracaoVar = document.getElementById("atracao-c-tag");
  static LocalVar = document.getElementById("local-c-tag");

  static CriacaoDeProdutos() {
    this.ALimentoVar.addEventListener("click", this.criaAlimento);
    this.AtracaoVar.addEventListener("click", this.criaAtracao);
    this.LocalVar.addEventListener("click", this.criaLocal);
  }

  static async criaAlimento() {
    const botaoEnviarAlimento = document.getElementById("botao-adicionar-alimento");
    botaoEnviarAlimento.addEventListener("click", Registro.performaCriacaoAlimento);
  }
  static async criaAtracao() {
    const botaoEnviarAtracao = document.getElementById("botao-adicionar-atracao");
    botaoEnviarAtracao.addEventListener("click", Registro.performaCriacaoAtracao);
  }
  static async criaLocal() {
    const botaoEnviarLocal = document.getElementById("botao-adicionar-local");
    botaoEnviarLocal.addEventListener("click", Registro.performaCriacaoLocal);
  }

  static validaFormulario(data, form) {
    let arr = Object.values(data);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "") {
        window.alert("Dados Inválidos, assegure de preenchar corretamente!");
        form.reset();
        return false;
      }
    }
    return true;
  }

  static async performaCriacaoAlimento() {
    const alimentoForm = document.getElementById("form-create-alimento");
    const formDados = new FormData(alimentoForm);
    const novoProduto = Object.fromEntries(formDados);
    const validacao = Registro.validaFormulario(novoProduto, alimentoForm);
    if (!validacao) {
      return;
    }
    alimentoForm.reset();

    const prod = {
      id_empresa: companyId,
      ...novoProduto,
      valor: +novoProduto.valor,
      quantidade: +novoProduto.quantidade,
    };

    await fetch("https://expresso-fiesta.herokuapp.com/alimento/insert", {
      method: "POST",
      body: JSON.stringify(prod),
    });

    await AlimentoModel.populaAlimentos();
    closeModal(Registro.modalAlimentoId);
  }
  static async performaCriacaoAtracao() {
    const atracaoForm = document.getElementById("form-create-atracao");
    const formDados = new FormData(atracaoForm);
    const novoProduto = Object.fromEntries(formDados);
    const validacao = Registro.validaFormulario(novoProduto, atracaoForm);
    if (!validacao) {
      return;
    }
    atracaoForm.reset();


    const prod = {
      id_empresa: companyId,
      ...novoProduto,
      valor: +novoProduto.valor,
    };

    await fetch("https://expresso-fiesta.herokuapp.com/atracao/insert", {
      method: "POST",
      body: JSON.stringify(prod),
    });

    await AtracaoModel.populaAtracao();
    closeModal(Registro.modalAtracaoId);
  }
  static async performaCriacaoLocal() {
    const localForm = document.getElementById("form-create-local");
    const formDados = new FormData(localForm);
    const novoProduto = Object.fromEntries(formDados);
    const validacao = Registro.validaFormulario(novoProduto, localForm);
    if (!validacao) {
      return;
    }
    localForm.reset();
    const statusLocal = "Disponivel";

    const prod = {
      id_empresa: companyId,
      status: statusLocal,
      ...novoProduto,
      valor: +novoProduto.valor,
    };
    await fetch("https://expresso-fiesta.herokuapp.com/local/insert", {
      method: "POST",
      body: JSON.stringify(prod),
    });


    await LocalModel.populaLocais();
    closeModal(Registro.modalLocalId);
  }
}
