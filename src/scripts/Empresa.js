const urlPerfil = "https://expresso-fiesta.herokuapp.com/usuario/"
function carregaDados() {
    let usuarioAtual = localStorage.getItem("@CURRENT_USER");
    let usuarioJson = JSON.parse(usuarioAtual);
    const url = urlPerfil + usuarioJson.id;
    fetch(url)
    .then((resposta) => resposta.json())
    .then((data) => {
        document.getElementById("fullName").value = data.nome
        document.getElementById("eMail").value = data.email
        document.getElementById("login").value = data.login
        document.getElementById("senha").value = data.senha
    })
}
function updateUsuario() {
    const usuario = {
        id : JSON.parse(localStorage.getItem("@CURRENT_USER")).id,
        email : document.getElementById("eMail").value,
        login : document.getElementById("login").value,
        nome : document.getElementById("fullName").value,
        senha : document.getElementById("senha").value
    }
    fetch("https://expresso-fiesta.herokuapp.com/usuario/update",{
        method: "POST",
        body : JSON.stringify(usuario),
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(erro => console.log(erro));
}


    
