const urlInsertUser = "https://expresso-fiesta.herokuapp.com/usuario/login";
const urlGetCompany = "https://expresso-fiesta.herokuapp.com/empresa/listUsuario/";
const formLogin = document.getElementById("form_login_usuario");
formLogin.addEventListener("submit", validar);
function validar(event) {
  event.preventDefault();
  const formDados = new FormData(event.target);
  const novoUsuario = JSON.stringify(Object.fromEntries(formDados));
  formLogin.reset();
  localStorage.clear()
  fazPost(novoUsuario);
}
async function fazPost(data) {
  let resultado = await fetch(urlInsertUser, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.id == 0) throw new Error("Credenciais Inválidas");
      return res;
    })
    .catch((err) => window.alert(err.message));

  delete resultado.senha;
  localStorage.setItem("@CURRENT_USER", JSON.stringify(resultado));
  if (resultado.vendedor == "SIM") {
    let ur = urlGetCompany + resultado.id
    let vend = await fetch(ur).then((res) => res.json()).then((res)=>res);
    localStorage.setItem("@CURRENT_COMPANY", JSON.stringify(vend));
  }
  window.alert("Login efetuado com sucesso!")
  setTimeout(() => {
    window.location = "/src/Delicious/index.html";
  }, 500);
}
