import AlimentoModel from "./ALimentoModel.js";
import AtracaoModel from "./AtracaoModel.js";
import LocalModel from "./LocalModel.js";
import { closeModal } from "./setOpenCloseModal.js";

const companyId = JSON.parse(localStorage.getItem("@CURRENT_COMPANY")).id;

export class Atualizacao {
  static modalAlimentoId = "#editProductModalAlimento";
  static modalAtracaoId = "#editProductModalAtracao";
  static modalLocalId = "#editProductModalLocal";

  static botaoAtualizarAlimento = "botao-editar-alimento";
  static botaoAtualizarAtracao = "botao-editar-atracao";
  static botaoAtualizarLocal = "botao-editar-local";

  static formularioAlimentoId = "form-edit-alimento";
  static formularioAtracaoId = "form-edit-atracao";
  static formularioLocalId = "form-edit-local";

  static produtoAtualOriginal;
  static produtoAtualAtualizado;

  static AtualizacaoAlimento(obj) {
    delete obj.tipo
    Atualizacao.produtoAtualOriginal = obj;
    const botaoSalvar = document.getElementById(Atualizacao.botaoAtualizarAlimento);
    const formularioAlimento = document.getElementById(Atualizacao.formularioAlimentoId);
    const form = formularioAlimento.children[1].children;
    Atualizacao.populaCamposFormulario(obj, form);
    botaoSalvar.addEventListener("click", Atualizacao.performaAtualizacaoAlimento);
  }
  static AtualizacaoAtracao(obj) {
    delete obj.tipo
    Atualizacao.produtoAtualOriginal = obj;
    const botaoSalvar = document.getElementById(Atualizacao.botaoAtualizarAtracao);
    const formularioAtracao = document.getElementById(Atualizacao.formularioAtracaoId);
    const form = formularioAtracao.children[1].children;
    Atualizacao.populaCamposFormulario(obj, form);
    botaoSalvar.addEventListener("click", Atualizacao.performaAtualizacaoAtracao);
  }
  static AtualizacaoLocal(obj) {
    delete obj.tipo
    Atualizacao.produtoAtualOriginal = obj;
    const botaoSalvar = document.getElementById(Atualizacao.botaoAtualizarLocal);
    const formularioLocal = document.getElementById(Atualizacao.formularioLocalId);
    const form = formularioLocal.children[1].children;
    Atualizacao.populaCamposFormulario(obj, form);
    botaoSalvar.addEventListener("click", Atualizacao.performaAtualizacaoLocal);
  }

  static async performaAtualizacaoAlimento() {
    const alimentoForm = document.getElementById(Atualizacao.formularioAlimentoId);
    const formDados = new FormData(alimentoForm);
    const produto = Object.fromEntries(formDados);
    const produtoAtualizado = Atualizacao.convertePraNumero(produto)
    const produtoFinal = {...Atualizacao.produtoAtualOriginal, ...produtoAtualizado}

    alimentoForm.reset()
    
    await fetch("https://expresso-fiesta.herokuapp.com/alimento/update/"+produtoFinal.id, {
      method: "POST",
      body: JSON.stringify(produtoFinal),
    });

    await AlimentoModel.populaAlimentos();
    closeModal(Atualizacao.modalAlimentoId);

  }
  static async performaAtualizacaoAtracao() {
    const atracaoForm = document.getElementById(Atualizacao.formularioAtracaoId);
    const formDados = new FormData(atracaoForm);
    const produto = Object.fromEntries(formDados);
    const produtoAtualizado = Atualizacao.convertePraNumero(produto)
    const produtoFinal = {...Atualizacao.produtoAtualOriginal, ...produtoAtualizado}
    // const index = atracoes.findIndex(el=> el.id == produtoFinal.id)
    // atracoes[index] = produtoFinal
    atracaoForm.reset()
    // console.table(atracoes);
    await fetch("https://expresso-fiesta.herokuapp.com/atracao/update/"+produtoFinal.id, {
      method: "POST",
      body: JSON.stringify(produtoFinal),
    });

    await AtracaoModel.populaAtracao();
    closeModal(Atualizacao.modalAtracaoId);
  }
  static async  performaAtualizacaoLocal() {
    const localForm = document.getElementById(Atualizacao.formularioLocalId);
    const formDados = new FormData(localForm);
    const produto = Object.fromEntries(formDados);
    const produtoAtualizado = Atualizacao.convertePraNumero(produto)
    const produtoFinal = {...Atualizacao.produtoAtualOriginal, ...produtoAtualizado}
    // const index = locais.findIndex(el=> el.id == produtoFinal.id)
    // locais[index] = produtoFinal

    localForm.reset()
    await fetch("https://expresso-fiesta.herokuapp.com/local/update/"+produtoFinal.id, {
      method: "POST",
      body: JSON.stringify(produtoFinal),
    });

    await LocalModel.populaLocais();
    closeModal(Atualizacao.modalLocalId);
  }

  static populaCamposFormulario(obj, arrhtml) {
    for (let i = 0; i < arrhtml.length; i++) {
      let input = arrhtml[i].children[1];
      let nomeAtual = input.name;
      input.value = obj[nomeAtual];
    }
  }
  static convertePraNumero(obj) {
    const atualizado = { ...obj, valor: +obj.valor };
    if (atualizado.quantidade) {
      atualizado.quantidade = +obj.quantidade;
    }
    return atualizado;
  }
}
