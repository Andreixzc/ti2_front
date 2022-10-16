import Model from "../models/LocalModel.js";

const logout = document.getElementById("logout--");
logout.addEventListener("click", () => {
  localStorage.clear();
  location.href = "../../login.html";
});

if (!localStorage.getItem("@CURRENT_USER")) {
  localStorage.clear();
  location.href = "../../login.html";
}
// 
// p
const urlGetAlimento = "https://expresso-fiesta.herokuapp.com/alimento/list";

function data() {
  const resultado = fetch(urlGetAlimento)
    .then((res) => res.json())
    .then((res) => {
      res.map((el) => {
        el.quantidade = 1;
        el.secao = "Alimento";
      });
      return res;
    });
  return resultado;
}

async function createCards() {
  const array = await data();
  array.forEach((elem) => {
    const tabelas = document.getElementById("tabelas");
    tabelas.append(Model.CriaCard(elem));
  });
}

createCards();

const cartLocal = document.getElementById("cart-local");
cartLocal.innerHTML = "";

Model.arrayLocais.forEach((el) => {
  cartLocal.append(Model.modelCarrinhoCard(el));
});
Model.atualizarQuantidadeTotal();

const finalizarPedido = document.getElementById("finalizar-pedido");
finalizarPedido.addEventListener("click", (e) =>
  montaPedido(e, Model.arrayLocais)
);

async function montaPedido(event, data) {
  event.preventDefault();

  let total = data.reduce((a, b) => {
    return a + b.quantidade * b.valor;
  }, 0);
  let quantidadeTotalProdutos = data.reduce((a, b) => {
    return a + b.quantidade;
  }, 0);
  let userId = JSON.parse(localStorage.getItem("@CURRENT_USER")).id;
  let localId = data.filter((el) => el.secao == "Local")[0].id;

  let arrAtracao = data
    .filter((el) => el.secao == "Atracao")
    .map((el) => {
      delete el.quantidade;
      delete el.secao;
      return el;
    });

  let arrAlimento = data
    .filter((el) => el.secao == "Alimento")
    .map((el) => {
      delete el.secao;
      return el;
    });

  let atracaoFormat = "atracoes_id=";
  let alimentoFormat = "alimentos_id=";
  for (let i = 0; i < arrAtracao.length; i++) {
    atracaoFormat += arrAtracao[i].id;
    if (!(i + 1 == arrAtracao.length)) atracaoFormat += ",";
  }

  for (let i = 0; i < arrAlimento.length; i++) {
    alimentoFormat += arrAlimento[i].id + "," + arrAlimento[i].quantidade;
    if (!(i + 1 == arrAlimento.length)) alimentoFormat += ",";
  }

  let date = new Date();
  let urlReq = `https://expresso-fiesta.herokuapp.com/pedido/insert?data_pedido=${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getDate()}&total=${total.toFixed(
    1
  )}&local_id=${localId}&usuario_id=${userId}&${atracaoFormat}&${alimentoFormat}`;

  const resultado = await fetch(urlReq, { method: "POST" })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
