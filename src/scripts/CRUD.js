import AlimentoModel from "./crudModels/ALimentoModel.js";
import AtracaoModel from "./crudModels/AtracaoModel.js";
import { Atualizacao } from "./crudModels/AtualizacaoModel.js";
import LocalModel from "./crudModels/LocalModel.js";
import { Registro } from "./crudModels/RegistroModel.js";


function logout() {
  window.alert("Você não tem permissão para acessar esta área!");
  location.href = "/src/Delicious/index.html";
}

const empresaId = JSON.parse(localStorage.getItem("@CURRENT_COMPANY")) || null;
if (!empresaId) logout();


AlimentoModel.populaAlimentos();
AtracaoModel.populaAtracao();
LocalModel.populaLocais();
Registro.CriacaoDeProdutos();
