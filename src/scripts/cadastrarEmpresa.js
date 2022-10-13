const urlInsertCompany = "https://expresso-fiesta.herokuapp.com/empresa/insert";
const formCadastrar = document.getElementById("cadastrar-empresa");
formCadastrar.addEventListener("submit", cadastrar);

async function cadastrar(e) {
  e.preventDefault();
  const empresa = {
    id_usuario: JSON.parse(localStorage.getItem("@CURRENT_USER")).id,
    nome_empresa: e.target.nome_empresa.value,
  };
  const novaEmpresa = JSON.stringify(empresa);

//   console.log(novaEmpresa);
  let res = await fetch(urlInsertCompany, {
    method: "POST",
    body: novaEmpresa,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => window.alert(err.message));

  //   verificar body retorno
  //   inserir dados da empresa no localstorage

  localStorage.setItem("@CURRENT_COMPANY", JSON.stringify(res));

  setTimeout(() => {
    window.location = "/src/empresaDetails/empresaDetalhes.html";
  }, 500);
}
