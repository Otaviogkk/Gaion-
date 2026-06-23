// Lê o ID da URL
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log("ID recebido na URL:", id);

if (id && id.startsWith("terreno-")) {
    id = id.split("-")[1];
}

// Verifica se o elemento existe antes de tentar manipulá-lo
function setTextContent(idElemento, texto) {
  const el = document.getElementById(idElemento);
  if (el) el.textContent = texto;
}

function setSrc(idElemento, src) {
  const el = document.getElementById(idElemento);
  if (el) el.src = src;
}

if (id) {
  fetch(`http://127.0.0.1:5000/api/terrenos/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Terreno não encontrado');
      }
      return response.json();
    })
    .then(p => {
      setTextContent("area", p.area || "-");
      setTextContent("preco", p.preco || "-");
      setSrc("imagem-grande", p.imagem);
      setTextContent("comprimento", p.comprimento || "-");
      setTextContent("largura", p.largura || "-");
      setTextContent("tipo", p.tipo || "-");

      setTextContent("bairro", p.bairro || "-");
      setTextContent("cidade", p.cidade || "Picos - PI");
      setTextContent("endereco", p.endereco || "-");
      setTextContent("referencia", p.referencia || "-");
      setTextContent("testada", p.testada || "-");
      setTextContent("topografia", p.topografia || "-");
      setTextContent("vendedor", p.vendedor || "-");
      setTextContent("contato", p.contato || "-");
      setTextContent("observacoes", p.observacoes || "-");
    })
    .catch(error => {
      console.error(error);
      const container = document.getElementById("produto-container");
      if (container) {
        container.innerHTML = "<h1>Produto não encontrado</h1>";
      } else {
        document.body.innerHTML = "<h1>Produto não encontrado</h1>";
      }
    });
} else {
  document.body.innerHTML = "<h1>ID não fornecido na URL</h1>";
}

//direciona o cliente
window.comprar = function () {
  const resposta = confirm(
    "Você deseja entrar em contato com o corretor?"
  );

  if (resposta) {
    const contato = document.getElementById("contato")?.textContent || "558994124419";
    // Limpar o telefone para apenas numeros
    let telefone = contato.replace(/\D/g, "");
    if (!telefone) telefone = "558994124419";
    // Adicionar código do país se não tiver
    if (telefone.length <= 11) {
        telefone = "55" + telefone;
    }
    
    const mensagem = "Olá! Fiquei interessado neste terreno.";

    window.location.href =
      "https://wa.me/" + telefone + "?text=" + encodeURIComponent(mensagem);
  }
};
