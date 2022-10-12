const urlInsertUser = "https://expresso-fiesta.herokuapp.com/usuario/insert";
const formCadastrar = document.getElementById("form_cadastrar_usuario");
formCadastrar.addEventListener("submit", validar);
function validar(event) {
  event.preventDefault();
  const formDados = new FormData(event.target);
  // console.log(Object.fromEntries(formDados),'saj0ijiasn')
  const novoUsuario = JSON.stringify(Object.fromEntries(formDados));
  formCadastrar.reset();
  registerUser(novoUsuario);
}
async function registerUser(data) {
  await fetch(urlInsertUser, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => window.alert(err.message));

  setTimeout(() => {
    window.location = "/login.html";
  }, 500);
}
