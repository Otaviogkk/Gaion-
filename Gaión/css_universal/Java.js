const sidebar = document.querySelector(".sidebar");
const sidebar2 = document.querySelector(".barra-buscar");
const sidebarToggler = document.querySelector(".sidebar");
const sidebarToggler2 = document.querySelector(".p");
sidebar.classList.add("collapsed");
sidebarToggler.addEventListener("mouseenter", () => {
 sidebar.classList.remove("collapsed");
});
sidebarToggler.addEventListener("mouseleave", () => {
  sidebar.classList.add("collapsed"); // fecha
});
sidebarToggler.addEventListener("mouseenter", () => {
 sidebar2.classList.add("collapsed");
})
sidebarToggler.addEventListener("mouseleave", () => {
 sidebar2.classList.remove("collapsed");
})
sidebarToggler2.addEventListener("click", () => {

  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    sidebar.classList.add("sidebar"); 
  } else {
    sidebar.className = "collapsed"; // fecha e substitui todas as outras classes
  }
});


// Botão para troca de pagina
function sair() { window.location.href = '../Conta/Criação/Criação.html';}
function inicio() { window.location.href = '../inicio/tela-iniciar.html';}
function inicio1() { window.location.href = '../../inicio/tela-iniciar.html';}