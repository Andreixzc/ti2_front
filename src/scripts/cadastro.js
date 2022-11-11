const urlInsertUser = "https://expresso-fiesta.herokuapp.com/usuario/insert";
const urlLoginUser = "https://expresso-fiesta.herokuapp.com/usuario/login";
const formCadastrar = document.getElementById("form_cadastrar_usuario");

formCadastrar.addEventListener("submit", validar);

function validar(event) {
  event.preventDefault();
  const formDados = new FormData(event.target);
  let empresario = false;
  const novoUsuario = JSON.stringify(Object.fromEntries(formDados));
  if (JSON.parse(novoUsuario).vendedor == "SIM") {
    empresario = true;
  }
  formCadastrar.reset();
  registerUser(novoUsuario, empresario);
}
async function registerUser(data, empresario) {
  let loginData = {
    login: JSON.parse(data).login,
    senha: JSON.parse(data).senha,
  };
  const res = await fetch(urlInsertUser, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .catch((err) => window.alert(err.message));

  if (empresario) {
    await login(loginData);
    setTimeout(() => {
      window.location = "/src/pages/Empresa.html";
    }, 500);
    return;
  }
  window.alert("Cadastro efetuado com sucesso!")
  setTimeout(() => {
    window.location = "/login.html";
  }, 500);
}

async function login(loginData) {
  let resultado = await fetch(urlLoginUser, {
    method: "POST",
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => window.alert(err.message));
    window.alert("Cadastro efetuado com sucesso!")

  delete resultado.senha;
  localStorage.setItem("@CURRENT_USER", JSON.stringify(resultado));
}
