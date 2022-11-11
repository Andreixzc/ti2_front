const urlLocal = "https://expresso-fiesta.herokuapp.com/local/1"
const urlAtracao = "https://expresso-fiesta.herokuapp.com/atracao/1"
const urlAlimento = "https://expresso-fiesta.herokuapp.com/alimento/2"

const responseObj = {
    local : "",
    atracao:"",
    alimento:""
  };
  
  carregaDados();
  

  async function carregaDados() {
    const data1 = await fetch(urlLocal).then((res )=> res.json()).then((res)=>res).catch((error)=>console.log(error))
    const data2 = await fetch(urlAtracao).then((res )=> res.json()).then((res)=>res).catch((error)=>console.log(error))
    const data3 = await fetch(urlAlimento).then((res )=> res.json()).then((res)=>res).catch((error)=>console.log(error))
    responseObj.local = data1.nome;
    responseObj.atracao = data2.nome;
    responseObj.alimento = data3.nome;
  }