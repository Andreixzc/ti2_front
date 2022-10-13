const logoNome = document.getElementById('nome-empresa-')
const empresa = JSON.parse(localStorage.getItem("@CURRENT_COMPANY"))
logoNome.innerText = empresa.nome_empresa

const redirecionaHome = document.getElementById('ir-home-')
redirecionaHome.addEventListener('click',redireciona)

function redireciona(e){
    setTimeout(() => {
        window.location = "/src/Delicious/index.html";
      }, 500);
}
