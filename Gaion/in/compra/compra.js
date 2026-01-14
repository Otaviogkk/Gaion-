  const produtos = {
 "terreno-1": { area: "250 m²", local: "Picos R. Santos", preco: "1.210.000", imagem: "../../imagens/ert.jpeg" },
 "terreno-2": { area: "180 m²", local: "Picos, Centro", preco: "1.175.000", imagem: "../../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg" },
 "terreno-3": { area: "320 m²", local: "Bairro Junco", preco: "2.095.000", imagem: "../../imagens/767267443391f57f2eb6949319d1f0a0.jpg" },
 "1":  { area: "250 m²", local: "Picos R. Santos", preco: "210.000", imagem: "../../imagens/ert.jpeg" },
 "2":  { area: "180 m²", local: "Centro", preco: "175.000", imagem: "../../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg" },
 "3": { area: "320 m²", local: "Bairro Junco", preco: "295.000", imagem: "../../imagens/767267443391f57f2eb6949319d1f0a0.jpg" },
 "4":{ area: "520 m²", local: "Bairro Junco", preco: "495.000", imagem: "../../imagens/2.jpeg" },
 "5":  { area: "320 m²", local: "Bairro Junco", preco: "95.000", imagem: "../../imagens/3.jpeg" },
 "6": { area: "89 kg",  local: "corpo", preco: "coxinha", imagem: "../../imagens/homem.png" },

 "7": { area: "250 m²", local: "Picos R. Santos", preco: "210.000", imagem: "../../imagens/ert.jpeg" },
 "8": { area: "180 m²", local: "Centro", preco: "175.000", imagem: "../../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg" },
 "9": { area: "320 m²", local: "Bairro Junco", preco: "295.000", imagem: "../../imagens/767267443391f57f2eb6949319d1f0a0.jpg" },
 "10":{ area: "520 m²", local: "Bairro Junco", preco: "495.000", imagem: "../../imagens/2.jpeg" },
 "11": { area: "320 m²", local: "Bairro Junco", preco: "95.000", imagem: "../../imagens/3.jpeg" },
 "12": { area: "89 kg",  local: "corpo", preco: "coxinha", imagem: "../../imagens/homem.png" },

 "13": { area: "250 m²", local: "Picos R. Santos", preco: "210.000", imagem: "../../imagens/ert.jpeg" },
 "14": { area: "180 m²", local: "Centro", preco: "175.000", imagem: "../../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg" },
 "15": { area: "320 m²", local: "Bairro Junco", preco: "295.000", imagem: "../../imagens/767267443391f57f2eb6949319d1f0a0.jpg" },
 "16":{ area: "520 m²", local: "Bairro Junco", preco: "495.000", imagem: "../../imagens/2.jpeg" },
 "17": { area: "320 m²", local: "Bairro Junco", preco: "95.000", imagem: "../../imagens/3.jpeg" },
 "18": { area: "89 kg",  local: "corpo", preco: "coxinha", imagem: "../../imagens/homem.png" },
  19: { area: "250 m²", local: "Picos R. Santos", preco: "210.000", imagem: "../../imagens/ert.jpeg" },
  20: { area: "180 m²", local: "Centro", preco: "175.000", imagem: "../../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg" },
  21: { area: "320 m²", local: "Bairro Junco", preco: "295.000", imagem: "../../imagens/767267443391f57f2eb6949319d1f0a0.jpg" },
  22: { area: "520 m²", local: "Bairro Junco", preco: "495.000", imagem: "../../imagens/2.jpeg" },
  23: { area: "320 m²", local: "Junco Bairro", preco: "95.000", imagem: "../../imagens/3.jpeg" },

  24: { area: "250 m²", local: "Picos R. Santos", preco: "210.000", imagem: "../../imagens/ert.jpeg" },
  25: { area: "180 m²", local: "Centro", preco: "175.000", imagem: "../../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg" },
  26: { area: "520 m²", local: "Bairro Junco", preco: "495.000", imagem: "../../imagens/2.jpeg" },
  27: { area: "320 m²", local: "Junco Bairro", preco: "95.000", imagem: "../../imagens/3.jpeg" },
  28: { area: "320 m²", local: "Bairro Junco", preco: "295.000", imagem: "../../imagens/767267443391f57f2eb6949319d1f0a0.jpg" }
};


  // Lê o ID da URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log("ID recebido na URL:", id); 

  // Verifica se o elemento existe antes de tentar manipulá-lo
  function setTextContent(idElemento, texto) {
    const el = document.getElementById(idElemento);
    if (el) el.textContent = texto;
  }

  function setSrc(idElemento, src) {
    const el = document.getElementById(idElemento);
    if (el) el.src = src;
  }

  if (id && produtos.hasOwnProperty(id)) {
    const p = produtos[id];
    setTextContent("area", p.area);
    setTextContent("local", p.local);
    setTextContent("preco", p.preco);
    setSrc("imagem-grande", p.imagem);
  } else {
    // Evita substituir todo o body se possível; melhor usar um container
    const container = document.getElementById("produto-container");
    if (container) {
      container.innerHTML = "<h1>Produto não encontrado</h1>";
    } else {
      document.body.innerHTML = "<h1>Produto não encontrado</h1>";
    }
  }
  