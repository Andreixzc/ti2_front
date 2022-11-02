export default class Model {
  static arrayLocais = JSON.parse(localStorage.getItem("@CURRENT_CART")) || [];

  static CriaCard(elem) {
    console.log(elem);
    const card = document.createElement("div");
    card.classList.add("col-12", "col-md-6", "col-lg-4", "cardCont");

    const cardSub = document.createElement("div");
    cardSub.classList.add("card", "cardSubCont");
    card.append(cardSub);

    const image = document.createElement("img");
    image.classList.add("card-img-top", "img-cart");
    image.src = elem.local_imagem;
    if (elem.secao == "Atracao") image.src = elem.atracao_imagem;
    if (elem.secao == "Alimento") image.src = elem.imagem_alimento;
    cardSub.append(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardSub.append(cardBody);

    const h4Nome = document.createElement("h4");
    h4Nome.classList.add("card-title", "h4Cart");
    h4Nome.innerText = elem.nome;
    cardBody.append(h4Nome);
    if (elem.secao != "Local") {
      h4Nome.classList.add("mBt");
    }

    if (elem.secao == "Local") {
      const parag = document.createElement("p");
      parag.classList.add("card-text");
      parag.innerText = elem.endereco;
      cardBody.append(parag);
    }

    const h4Valor = document.createElement("h4");
    h4Valor.classList.add("card-title");
    h4Valor.innerText = `R$ ${elem.valor}`;
    cardBody.append(h4Valor);

    const button = document.createElement("button");
    button.classList.add("btn", "btn-success", "btn-block");
    button.innerText = "Adicionar ao pedido";
    cardBody.append(button);
    button.addEventListener("click", () => this.adicionaCardLocalCarrinho(elem));

    return card;
  }

  //
  //
  //

  static adicionaCardLocalCarrinho(elem) {
    if (elem.secao == "Local") {
      if (this.arrayLocais.filter((el) => el.secao == elem.secao).length >= 1) {
        window.alert("Não é possivel adicionar mais de local");

        const cartLocal = document.getElementById("cart-local");
        cartLocal.innerHTML = "";
        this.arrayLocais.forEach((el) => {
          cartLocal.append(this.modelCarrinhoCard(el));
        });
        if (elem.secao != "Alimento") elem.quantidade = 1;
        this.atualizarQuantidadeTotal();
        localStorage.setItem("@CURRENT_CART", JSON.stringify(this.arrayLocais));
        return;
      }
    }

    if (this.arrayLocais.find((el) => el.nome == elem.nome)) {
      this.arrayLocais = this.arrayLocais.map((el) => {
        if (el.nome == elem.nome && elem.secao == "Alimento") el.quantidade++;
        return el;
      });
    }
    if (!this.arrayLocais.find((el) => el.nome == elem.nome)) {
      this.arrayLocais.push(elem);
    }

    const cartLocal = document.getElementById("cart-local");
    cartLocal.innerHTML = "";
    this.arrayLocais.forEach((el) => {
      cartLocal.append(this.modelCarrinhoCard(el));
    });
    if (elem.secao != "Alimento") elem.quantidade = 1;
    this.atualizarQuantidadeTotal();
    localStorage.setItem("@CURRENT_CART", JSON.stringify(this.arrayLocais));
  }

  //
  //

  static modelCarrinhoCard(elem) {
    const cardLocalCart = document.createElement("li");
    cardLocalCart.classList.add("clearfix");

    const image = document.createElement("img");
    image.classList.add("productImage");
    image.src = elem.urlImg;
    cardLocalCart.append(image);

    const divSec = document.createElement("div");
    divSec.classList.add("sec");
    cardLocalCart.append(divSec);

    const spanName = document.createElement("span");
    spanName.classList.add("item-name");
    spanName.innerText = elem.nome;
    divSec.append(spanName);

    const spanPrice = document.createElement("span");
    spanPrice.classList.add("item-price");
    spanPrice.innerText = `R$ ${elem.valor}`;
    divSec.append(spanPrice);

    const cartOpt = document.createElement("div");
    cartOpt.classList.add("cart-opt");
    divSec.append(cartOpt);

    const divQuantidade = document.createElement("div");
    divQuantidade.classList.add("quantidade");

    if (elem.secao != "Alimento") {
      divQuantidade.classList.add("hidden");
    }
    cartOpt.append(divQuantidade);

    const buttonSUB = document.createElement("button");
    buttonSUB.classList.add("buttonQT");
    buttonSUB.innerText = "-";
    buttonSUB.addEventListener("click", (event) => this.removerQuantidadeUnitaria(event, elem));
    divQuantidade.append(buttonSUB);

    const QuantidadeUnit = document.createElement("span");
    QuantidadeUnit.innerText = elem.quantidade;
    divQuantidade.append(QuantidadeUnit);

    const buttonADD = document.createElement("button");
    buttonADD.classList.add("buttonQT");
    buttonADD.innerText = "+";
    buttonADD.addEventListener("click", () => this.adicionaCardLocalCarrinho(elem));
    divQuantidade.append(buttonADD);

    const buttonRemover = document.createElement("button");
    buttonRemover.classList.add("buttonRemover");
    buttonRemover.innerText = "Remover";
    buttonRemover.addEventListener("click", (event) => this.removerDefinitivo(event, elem));
    cartOpt.append(buttonRemover);

    return cardLocalCart;
  }
  static atualizarQuantidadeTotal() {
    const totalCartSoma = document.getElementById("totalCartSoma");
    const totalQt1 = document.getElementById("totalQt1");
    const totalQt2 = document.getElementById("totalQt2");

    let sum = this.arrayLocais.reduce((a, b) => {
      return a + b.valor * b.quantidade;
    }, 0);
    totalCartSoma.innerText = `R$ ${sum.toFixed(2)}`;

    const quantidadeItens = this.arrayLocais.reduce((a, b) => {
      return a + b.quantidade;
    }, 0);

    totalQt1.innerText = quantidadeItens;
    totalQt2.innerText = quantidadeItens;
  }
  static removerQuantidadeUnitaria(event, elem) {
    if (elem.quantidade == 1) {
      this.removerCarrinho(event, elem);
      return;
    }
    this.arrayLocais = this.arrayLocais.map((el) => {
      if (el.nome == elem.nome) {
        el.quantidade--;
        event.path[1].children[1].innerText = el.quantidade;
      }
      return el;
    });

    this.atualizarQuantidadeTotal();
    localStorage.setItem("@CURRENT_CART", JSON.stringify(this.arrayLocais));
  }

  static removerCarrinho(event, elem) {
    elem.quantidade = 1;
    this.arrayLocais = this.arrayLocais.filter((el) => el.nome != elem.nome);
    event.path[4].remove();
    this.atualizarQuantidadeTotal();
    localStorage.setItem("@CURRENT_CART", JSON.stringify(this.arrayLocais));
  }
  static removerDefinitivo(event, elem) {
    elem.quantidade = 1;
    this.arrayLocais = this.arrayLocais.filter((el) => el.nome != elem.nome);
    event.path[3].remove();
    this.atualizarQuantidadeTotal();
    localStorage.setItem("@CURRENT_CART", JSON.stringify(this.arrayLocais));
  }
}
