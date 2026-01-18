// ============ PRIMEIRO CARROSSEL (banner principal) ============
const imagensProduto = [
  { id: "terreno-1", url: "../imagens/ert.jpeg", link:"compra/compra.html", area: "250 m²", local: "Picos R. Santos", preco: "1.210.000,00" },
  { id: "terreno-2", url: "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg", link: "compra/compra.html", area: "180 m²", local: "Picos, Centro ", preco: "111.750,00" },
  { id: "terreno-3", url: "../imagens/767267443391f57f2eb6949319d1f0a0.jpg", link: "compra/compra.html", area: "320 m²", local: "Bairro Junco", preco: "201.950,00" }
];

const banner = document.querySelector(".banner");
const dotsContainer = document.createElement("div");
dotsContainer.classList.add("bolhinas");
banner.appendChild(dotsContainer);

let index = 0;
let interval;

imagensProduto.forEach((img, i) => {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  if (i === 0) slide.classList.add("active");
  slide.style.backgroundImage = `url(${img.url})`;

  const info = document.createElement("div");
  info.classList.add("info");
  info.innerHTML = `
    <div class="linha">
      <svg width="32" height="19" viewBox="0 0 32 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.10907 8.28143L16.1091 17.7814L31.1091 8.28143L16.1091 0.281433L0.10907 8.28143Z" fill="#FFF0F0"/>
        <path d="M4.10907 11.2014L16.1091 18.2014" stroke="#000000ff" stroke-width="0.5"/>
        <path d="M28.178 10.3867L16.0402 18.1761" stroke="#000000ff" stroke-width="0.5"/>
        <path d="M0.10907 8.28143L16.6091 0.281433L31.1091 8.28143" stroke="#460606" stroke-width="0.5"/>
      </svg>
      ${img.area}
    </div>
    <div class="linha">
      <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_10_68" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="31">
          <rect width="25.4925" height="30.3741" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_10_68)">
          <path d="M17.9115 7.20743L18.1381 7.34512L18.3783 7.23477L24.1791 4.57559V24.7211H18.3149L8.13126 18.2895L7.81388 18.0893L7.53263 18.3393L1.0424 24.1078V5.42813L7.86954 1.1293L17.9115 7.20743Z" fill="white" stroke="#460606"/>
          <path d="M8.10408 0.813577L8.10407 18.4456" stroke="#460606"/>
          <line x1="18.399" y1="7.05109" x2="18.399" y2="24.9501" stroke="#460606"/>
          <path d="M18.121 28.1794C18.3155 27.9645 18.5781 27.6692 18.8788 27.3112C19.533 26.5323 20.3656 25.4672 21.0907 24.3131C21.8203 23.1517 22.4188 21.9355 22.6376 20.8493C22.8542 19.7731 22.6867 18.9117 22.0135 18.3034C19.7541 16.2617 16.4888 16.2616 14.2294 18.3034C13.5562 18.9117 13.3897 19.7731 13.6063 20.8493C13.8251 21.9354 14.4226 23.1518 15.1522 24.3131C15.8772 25.4671 16.7099 26.5324 17.3641 27.3112C17.6645 27.6688 17.9265 27.9646 18.121 28.1794Z" fill="white" stroke="#460606"/>
          <rect x="16.8142" y="20.0686" width="2.71197" height="2.71197" fill="#460606"/>
        </g>
      </svg>
      ${img.local}
    </div>
    <div class="preco">R$ ${img.preco}</div>
  `;

  slide.appendChild(info);
slide.dataset.produtoId = img.id;

slide.addEventListener("click", function() {
  const id = this.dataset.produtoId; // pega do próprio elemento
  const url = new URL("compra/compra.html", window.location.href);
  url.searchParams.set("id", id);
  window.location.href = url.toString();
});
  banner.appendChild(slide);

  const dot = document.createElement("div");
  dot.classList.add("bola");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    trocarSlide(i);
    resetInterval();
  });
  dotsContainer.appendChild(dot);



});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".bola");

  // ============ SUPORTE A ARRASTAR COM O DEDO NO BANNER PRINCIPAL ============
let startXBanner = 0;
let endXBanner = 0;
const swipeThreshold = 50; // mínimos pixels para considerar um swipe

banner.addEventListener("touchstart", (e) => {
  startXBanner = e.touches[0].clientX;
});

banner.addEventListener("touchend", (e) => {
  endXBanner = e.changedTouches[0].clientX;
  const diff = startXBanner - endXBanner;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe para a esquerda → próximo slide
      proximoSlide();
    } else {
      // Swipe para a direita → slide anterior
      trocarSlide((index - 1 + slides.length) % slides.length);
    }
    resetInterval(); // reinicia o intervalo automático
  }
});

// Opcional: impedir scroll horizontal acidental durante o toque no banner
banner.addEventListener("touchmove", (e) => {
  // Não fazemos nada aqui, mas evitamos comportamentos indesejados
  // Se quiser, pode impedir scroll vertical ao arrastar horizontalmente:
  // e.preventDefault(); // use com cuidado!
});

function trocarSlide(novo) {
  slides[index].classList.remove("active");
  dots[index].classList.remove("active");

  index = novo;

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function proximoSlide() {
  trocarSlide((index + 1) % slides.length);
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(proximoSlide, 3500);
}

interval = setInterval(proximoSlide, 3500);


// ============ SEGUNDO CARROSSEL (track - produtos adicionais) ============

function criarCarrossel(trackSelector, produtos, idBtnAvancar, idBtnVoltar, visiveis = 3) {
  const track = document.querySelector(trackSelector);
  const btnAvancar = document.getElementById(idBtnAvancar);
  const btnVoltar = document.getElementById(idBtnVoltar);

  if (!track || !btnAvancar || !btnVoltar) {
    console.warn("Elemento não encontrado para o carrossel:", trackSelector);
    return;
  }

  let page = 0;
  const extended = [...produtos, ...produtos.slice(0, visiveis)];

  // Limpar conteúdo anterior (útil se reusar)
  track.innerHTML = '';

  // Criar cards
  extended.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("item");
    const produtoId = p.id !== undefined ? p.id : index;
    item.dataset.produtoId = produtoId;

    const img = document.createElement("img");
    img.src = p.url;
    img.alt = "Imóvel";
    img.loading = "lazy";


      item.appendChild(img);
    

    if (p.area || p.local || p.preco) {
      const info = document.createElement("div");
      info.classList.add("info");
      info.innerHTML = `
        <div class="linha">
          <svg width="32" height="19" viewBox="0 0 32 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.10907 8.28143L16.1091 17.7814L31.1091 8.28143L16.1091 0.281433L0.10907 8.28143Z" fill="#FFF0F0"/>
            <path d="M4.10907 11.2014L16.1091 18.2014" stroke="#000000ff" stroke-width="0.5"/>
            <path d="M28.178 10.3867L16.0402 18.1761" stroke="#000000ff" stroke-width="0.5"/>
            <path d="M0.10907 8.28143L16.6091 0.281433L31.1091 8.28143" stroke="#460606" stroke-width="0.5"/>
          </svg>
          ${p.area || '—'}
        </div>
        <div class="linha">
          <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_10_68" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="31">
              <rect width="25.4925" height="30.3741" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_10_68)">
              <path d="M17.9115 7.20743L18.1381 7.34512L18.3783 7.23477L24.1791 4.57559V24.7211H18.3149L8.13126 18.2895L7.81388 18.0893L7.53263 18.3393L1.0424 24.1078V5.42813L7.86954 1.1293L17.9115 7.20743Z" fill="white" stroke="#460606"/>
              <path d="M8.10408 0.813577L8.10407 18.4456" stroke="#460606"/>
              <line x1="18.399" y1="7.05109" x2="18.399" y2="24.9501" stroke="#460606"/>
              <path d="M18.121 28.1794C18.3155 27.9645 18.5781 27.6692 18.8788 27.3112C19.533 26.5323 20.3656 25.4672 21.0907 24.3131C21.8203 23.1517 22.4188 21.9355 22.6376 20.8493C22.8542 19.7731 22.6867 18.9117 22.0135 18.3034C19.7541 16.2617 16.4888 16.2616 14.2294 18.3034C13.5562 18.9117 13.3897 19.7731 13.6063 20.8493C13.8251 21.9354 14.4226 23.1518 15.1522 24.3131C15.8772 25.4671 16.7099 26.5324 17.3641 27.3112C17.6645 27.6688 17.9265 27.9646 18.121 28.1794Z" fill="white" stroke="#460606"/>
              <rect x="16.8142" y="20.0686" width="2.71197" height="2.71197" fill="#460606"/>
            </g>
          </svg>
          ${p.local || '—'}
        </div>
        <div class="preco">R$ ${p.preco || '—'}</div>
      `;
      item.appendChild(info);
    }
      item.addEventListener("click", function () {
      const id = this.dataset.produtoId;
      const url = new URL("compra/compra.html", window.location.href);
      url.searchParams.set("id", id);
      window.location.href = url.toString();
    });
    track.appendChild(item);
  });

  function getStep() {
    const item = track.querySelector(".item");
    if (!item) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return item.offsetWidth + gap;
  }

  function update(animate = true) {
    const step = getStep();
    if (step === 0) return;
    track.style.transition = animate ? "transform 0.3s ease" : "none";
    track.style.transform = `translateX(-${page * step}px)`;
  }
    // ==============================
  // SUPORTE A ARRASTAR COM O DEDO
  // ==============================
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = "none";
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const delta = startX - currentX;
    const step = getStep();
    track.style.transform = `translateX(-${page * step + delta}px)`;
  });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;

    const delta = startX - currentX;
    const step = getStep();

    track.style.transition = "transform 0.3s ease";

    if (Math.abs(delta) > step / 4) {
      if (delta > 0) {
        page++; // swipe esquerda
      } else {
        page--; // swipe direita
      }
    }

    if (page < 0) page = 0;
    if (page >= produtos.length) page = produtos.length - 1;

    update();
  });

  // Avançar (→)
  btnAvancar.addEventListener("click", () => {
    page++;
    update();
    if (page >= produtos.length) {
      setTimeout(() => {
        page = 0;
        update(false);
      }, 300);
    }
  });

  // Voltar (←)
  btnVoltar.addEventListener("click", () => {
    if (page === 0) {
      page = produtos.length;
      update(false);
    }
    page--;
    update();
  });

  // Inicializar
  window.addEventListener("load", () => setTimeout(update, 100));
}
const novosProdutos = [
  { id:1, url: "../imagens/ert.jpeg", link: "Painel/Painel.html", area: "250 m²", local: "Picos R. Santos", preco: "210.000" },  
  { id:2, url: "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg", link: "Painel/Painel.html", area: "180 m²", local: "Centro", preco: "175.000" },
  { id:3, url: "../imagens/767267443391f57f2eb6949319d1f0a0.jpg", link: "Painel/Painel.html", area: "320 m²", local: "Bairro Junco", preco: "295.000"},
  { id:4, url: "../imagens/2.jpeg", area: "520 m²", local: "Bairro Junco", preco: "495.000" },
  { id:5, url: "../imagens/3.jpeg",area: "-320 m²", local: "Junco Bairro", preco: "95.000" },
  { id:6, url: "../imagens/homem.png", area: "89 kg", local: "corpo", preco: "coxinha" }
];

const OutraGaleria = [
  { id: 7, url: "../imagens/ert.jpeg", link: "Painel/Painel.html", area: "250 m²", local: "Picos R. Santos", preco: "210.000" },  
  { id: 8,url: "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg", link: "Painel/Painel.html", area: "180 m²", local: "Centro", preco: "175.000" },
  { id: 9,url: "../imagens/767267443391f57f2eb6949319d1f0a0.jpg", link: "Painel/Painel.html", area: "320 m²", local: "Bairro Junco", preco: "295.000"},
  {id: 10, url: "../imagens/2.jpeg", area: "520 m²", local: "Bairro Junco", preco: "495.000" },
  { id: 11,url: "../imagens/3.jpeg",area: "-320 m²", local: "Junco Bairro", preco: "95.000" },
  { id: 12,url: "../imagens/homem.png", area: "89 kg", local: "corpo", preco: "coxinha" }
];

const OutraoutraGaleria = [
  { id:13,url: "../imagens/ert.jpeg", link: "Painel/Painel.html", area: "250 m²", local: "Picos R. Santos", preco: "210.000" },  
  { id:14,url: "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg", link: "Painel/Painel.html", area: "180 m²", local: "Centro", preco: "175.000" },
  { id:15,url: "../imagens/767267443391f57f2eb6949319d1f0a0.jpg", link: "Painel/Painel.html", area: "320 m²", local: "Bairro Junco", preco: "295.000"},
  { id:16,url: "../imagens/2.jpeg", area: "520 m²", local: "Bairro Junco", preco: "495.000" },
  { id:17,url: "../imagens/3.jpeg",area: "-320 m²", local: "Junco Bairro", preco: "95.000" },
  { id:18,url: "../imagens/homem.png", area: "89 kg", local: "corpo", preco: "coxinha" }
];

criarCarrossel(".track", novosProdutos, "duas", "uno");        // primeira galeria
criarCarrossel(".track2", OutraGaleria, "duas2", "uno2");
criarCarrossel(".track3", OutraoutraGaleria,"duas3","uno3")

const Galeria = [
  { id: 19, url: "../imagens/ert.jpeg", area: "250 m²", local: "Picos R. Santos", preco: "210.000" },
  { id: 20, url: "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg", area: "180 m²", local: "Centro", preco: "175.000" },
  { id: 21, url: "../imagens/767267443391f57f2eb6949319d1f0a0.jpg", area: "320 m²", local: "Bairro Junco", preco: "295.000" },
  { id: 22, url: "../imagens/2.jpeg", area: "520 m²", local: "Bairro Junco", preco: "495.000" },
  { id: 23, url: "../imagens/3.jpeg", area: "320 m²", local: "Junco Bairro", preco: "95.000" },
  { id: 24, url: "../imagens/ert.jpeg", area: "250 m²", local: "Picos R. Santos", preco: "210.000" },
  { id: 25, url: "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg", area: "180 m²", local: "Centro", preco: "175.000" },
  { id: 26, url: "../imagens/2.jpeg", area: "520 m²", local: "Bairro Junco", preco: "495.000" },
  { id: 27, url: "../imagens/3.jpeg", area: "320 m²", local: "Junco Bairro", preco: "95.000" },
  { id: 28, url: "../imagens/767267443391f57f2eb6949319d1f0a0.jpg", area: "320 m²", local: "Bairro Junco", preco: "295.000" }
];

const tota = document.querySelector(".total");

Galeria.forEach(item => {
  const itema = document.createElement("div");
  itema.classList.add("itema");
  itema.dataset.produtoId = item.id; // também adiciona ID

  const img = document.createElement("img");
  img.src = item.url;
  img.alt = "Imóvel";
  img.loading = "lazy";
  itema.appendChild(img);

  const info = document.createElement("div");
  info.innerHTML = `
    <div class="info3">
      <div class="info3A">
        <strong>Terreno disponível com área total de ${item.area}, situado no ${item.local}</strong><br>
      </div>
      <div class="info3C">
        <strong class="preco">R$</strong> ${item.preco}
      </div>
    </div>
  `;
  itema.appendChild(info);

  // Também adiciona clique na galeria fixa
  itema.addEventListener("click", function () {
    const id = this.dataset.produtoId;
    const url = new URL("compra/compra.html", window.location.href);
    url.searchParams.set("id", id);
    window.location.href = url.toString();
  });

  tota.appendChild(itema);
});