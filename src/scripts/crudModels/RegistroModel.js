import { atracoes, alimentos, locais } from "../arrayTest/produtos.js";
import AlimentoModel from "./ALimentoModel.js";
import AtracaoModel from "./AtracaoModel.js";
import LocalModel from "./LocalModel.js";
import { closeModal } from "./setOpenCloseModal.js";

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

  static geraIdRandom() {
    return parseInt(Math.random() * (2000 - 100) + 100);
  }

  static performaCriacaoAlimento() {
    const alimentoForm = document.getElementById("form-create-alimento");
    const formDados = new FormData(alimentoForm);
    const novoProduto = Object.fromEntries(formDados);
    const validacao = Registro.validaFormulario(novoProduto, alimentoForm);
    if (!validacao) {
      return;
    }
    // json stringfy dpois
    alimentoForm.reset();
    const idProduto = Registro.geraIdRandom(); // colocar o localstoragep ra final dinamico
    const prod = {
      id: idProduto,
      id_empresa: 1,
      ...novoProduto,
      valor: +novoProduto.valor,
      quantidade: +novoProduto.quantidade,
    };

    alimentos.push(prod);
    console.table(alimentos);
    AlimentoModel.populaAlimentos();
    closeModal(Registro.modalAlimentoId);
  }
  static performaCriacaoAtracao() {
    const atracaoForm = document.getElementById("form-create-atracao");
    const formDados = new FormData(atracaoForm);
    const novoProduto = Object.fromEntries(formDados);
    const validacao = Registro.validaFormulario(novoProduto, atracaoForm);
    if (!validacao) {
      return;
    }
    // json stringfy dpois
    atracaoForm.reset();
    const idProduto = Registro.geraIdRandom(); // colocar o localstoragep ra final dinamico
    const prod = {
      id: idProduto,
      id_empresa: 1,
      ...novoProduto,
      valor: +novoProduto.valor,
    };
    atracoes.push(prod);
    console.table(atracoes);
    AtracaoModel.populaAtracao();
    closeModal(Registro.modalAtracaoId);
  }
  static performaCriacaoLocal() {
    const localForm = document.getElementById("form-create-local");
    const formDados = new FormData(localForm);
    const novoProduto = Object.fromEntries(formDados);
    const validacao = Registro.validaFormulario(novoProduto, localForm);
    if (!validacao) {
      return;
    }
    // json stringfy dpois
    localForm.reset();
    const idProduto = Registro.geraIdRandom(); // colocar o localstoragep ra final dinamico
    const statusLocal = "DISPONIVEL";
    const prod = {
      id: idProduto,
      id_empresa: 1,
      status: statusLocal,
      ...novoProduto,
      valor: +novoProduto.valor,
    };
    locais.push(prod);
    console.table(locais);
    LocalModel.populaLocais();
    closeModal(Registro.modalLocalId);
  }
}
