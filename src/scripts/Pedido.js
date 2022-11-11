const userID = JSON.parse(localStorage.getItem("@CURRENT_USER")).id;
const urlGet = "https://expresso-fiesta.herokuapp.com/pedido/usuario/" + userID;

async function getArrayPedidos() {
  return await fetch(urlGet)
    .then((res) => res.json())
    .then((res) => res)
    .catch((er) => console.log(er));
}

async function populaPedidos() {
  const pedidosContainer = document.getElementById("containerPedidos");
  pedidosContainer.innerHTML = "";
  const pedidos = await getArrayPedidos();

  pedidos.forEach((el) => {
    const card = document.createElement("div");
    card.setAttribute("id", "card");
    const data = `${el.data_pedido.dayOfMonth} ${el.data_pedido.month} ${el.data_pedido.year}`;
    card.innerHTML = `
        <div class="card h-100">
                    <div class="d-flex justify-content-around mw-100 mh-100">
                                <label>${el.id}</label>
                                <label>${data.toLowerCase( )}</label>
                                <label>R$ ${el.total.toFixed(2)}</label>
                    </div>
        </div>
        `;
    pedidosContainer.appendChild(card)
  });
}
populaPedidos()
