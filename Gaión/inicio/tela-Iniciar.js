function Sabia_mais(){
window.location.href = "../texto/pagina_de_infomação.html"
}
function Entra(){
window.location.href = "../Conta/Gaión.html"
}
function criação(){
window.location.href = "../Conta/Criação/Criação.html"
}
let currentIndex = 0;
const slides = document.querySelector('.banner-slides');
const totalSlides = slides.children.length;

// Função para obter a largura de um slide com base no tamanho da tela
function getSlideWidth() {
  if (window.innerWidth <= 480) {
    return window.innerWidth * 0.94; // 94% da largura da tela
  } else {
    // Aqui, assumimos que o contêiner .slides (ou .banner-slides) tem largura fixa ou responsiva
    // Podemos calcular a largura média de um slide, ou usar o offsetWidth do primeiro slide
    return slides.children[0]?.offsetWidth || 1300; // Fallback para 1300 se não encontrar
  }
}

// Atualiza o carrossel com a posição correta
function updateSlidePosition() {
  const slideWidth = getSlideWidth();
  slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Avança para o próximo slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
}

// Inicializa a posição correta ao carregar
updateSlidePosition();

// Recalcula a posição ao redimensionar a janela
window.addEventListener('resize', () => {
  updateSlidePosition();
});

// Inicia a rotação automática
setInterval(nextSlide, 5000); // 10.000ms = 10 segundos


function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
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

