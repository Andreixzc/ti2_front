const urlInsertUser = "https://expresso-fiesta.herokuapp.com/usuario/insert";
const formCadastrar = document.getElementById("form_cadastrar_usuario");
formCadastrar.addEventListener("submit", validar);
function validar(event) {
  event.preventDefault();
  const formDados = new FormData(event.target);
  let empresario = false;
  // console.log(Object.fromEntries(formDados),'saj0ijiasn')
  const novoUsuario = JSON.stringify(Object.fromEntries(formDados));
  if (JSON.parse(novoUsuario).vendedor == "SIM") {
    empresario = true;
  }
  formCadastrar.reset();
  registerUser(novoUsuario, empresario);
}
async function registerUser(data, empresario) {
  await fetch(urlInsertUser, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => window.alert(err.message));

  if (empresario) {
    setTimeout(() => {
      window.location = "/src/pages/Empresa.html";
    }, 500);
    return;
  }

  setTimeout(() => {
    window.location = "/login.html";
  }, 500);
}
