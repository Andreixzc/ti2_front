const urlLocal = "https://expresso-fiesta.herokuapp.com/local/list";
const urlAtracao = "https://expresso-fiesta.herokuapp.com/atracao/list";
const urlAlimento = "https://expresso-fiesta.herokuapp.com/alimento/list";

const responseObj = {
  recomendar: "",
};

carregaDados();

async function carregaDados() {
  const data1 = await fetch(urlLocal)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
  const data2 = await fetch(urlAtracao)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
  const data3 = await fetch(urlAlimento)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
  const att = [...data3];
  att.sort((a, b) => b.quantidade - a.quantidade);


  responseObj.recomendar = `
    Alimento mais popular: ${att[0].nome}, 
    Local mais desejado: ${data1[0].nome}, 
    Atracao mais cobiçada: ${data2[0].nome}
  `
}
