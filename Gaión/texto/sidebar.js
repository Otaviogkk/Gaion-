function perfil() {
  const sb = document.getElementById('sidebar');
  sb.classList.add('open');
}
function fecharPerfil() {
  const sb = document.getElementById('sidebar');
  sb.classList.remove('open');
}
function Sabia_mais() {
  window.location.href = '../texto/pagina_de_infomação.html';
}
function Entra() {
  window.location.href = '../Conta/Gaión.html';
}
function volta(){
  window.location.href ="../inicio/tela-Iniciar.html";
}
function criação(){
window.location.href = "../Conta/Criação/Criação.html"
}


function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

document.addEventListener("click", function(e) {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector(".hamburger");

  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});

const initialHeight = window.innerHeight;

window.addEventListener("resize", () => {
  const heightDiff = initialHeight - window.innerHeight;
  if (heightDiff > 150) {
    // Provavelmente o teclado abriu — ignore ou trate de forma diferente
    console.log("Teclado aberto");
  } else {
    // Resize verdadeiro
    console.log("Resize real");
  }
});

