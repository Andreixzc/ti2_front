const urlPerfil = "https://expresso-fiesta.herokuapp.com/local/1"
const responseObj = {
    local : "uhehue"
  };
  
  carregaDados();
  

  async function carregaDados() {
    const data = await fetch(urlPerfil).then((res )=> res.json()).then((res)=>res).catch((error)=>console.log(error))
    console.log(data.nome)
    responseObj.local = data.nome;
    return data.nome;
  }
      
  
      
  