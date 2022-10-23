import AlimentoModel from "./crudModels/ALimentoModel.js";
import AtracaoModel from "./crudModels/AtracaoModel.js";
import LocalModel from "./crudModels/LocalModel.js";
// function logout() {
//   window.alert("Você não tem permissão para acessar esta área!");
//   location.href = "/src/Delicious/index.html";
// }

// const empresaId = JSON.parse(localStorage.getItem("@CURRENT_COMPANY")).id || null;
// if (!empresaId) logout();

// const urlGetAlimento = `https://expresso-fiesta.herokuapp.com/empresa/alimentoList/${empresaId}`;
// const urlGetAtracao = `https://expresso-fiesta.herokuapp.com/empresa/atracaoList/${empresaId}`;
// const urlGetLocal = `https://expresso-fiesta.herokuapp.com/empresa/localList/${empresaId}`;




AlimentoModel.populaAlimentos()
AtracaoModel.populaAtracao()
LocalModel.populaLocais()