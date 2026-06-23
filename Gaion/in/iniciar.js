document.addEventListener("DOMContentLoaded", () => {
  fetch('http://127.0.0.1:5000/api/terrenos')
    .then(response => response.json())
    .then(data => {
      const produtos = data.map(t => ({
        id: t.id,
        url: t.imagem,
        link: "compra/compra.html",
        area: t.area ? `${t.area} m²` : "—",
        local: t.bairro || t.endereco || "—",
        preco: t.preco || "—",
        frente: t.largura || "—",
        profundidade: t.comprimento || "—",
        tipo: t.tipo || "—"
      }));

      if(produtos.length === 0) return;

      initBanner(produtos.slice(0, 3));
      
      const carrosel1 = produtos.slice(0, 6);
      const carrosel2 = produtos.length > 6 ? produtos.slice(6, 12) : produtos;
      const carrosel3 = produtos.length > 12 ? produtos.slice(12, 18) : produtos;

      criarCarrossel(".track", carrosel1, "duas", "uno");
      criarCarrossel(".track2", carrosel2, "duas2", "uno2");
      criarCarrossel(".track3", carrosel3, "duas3", "uno3");

      initGaleria(produtos);
    })
    .catch(err => console.error("Erro ao carregar terrenos:", err));
});

// ============ PRIMEIRO CARROSSEL (banner principal) ============
function initBanner(imagensProduto) {
  const banner = document.querySelector(".banner");
  if (!banner) return;
  
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

    slide.dataset.produtoId = img.id;
    if (img.area || img.local || img.preco) {
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
            ${img.area || '—'}
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
            ${img.local || '—'}
          </div>
          <div class="preco">R$ ${img.preco || '—'}</div>
        `;
        slide.appendChild(info);
    }

    slide.addEventListener("click", function () {
      const url = new URL("compra/compra.html", window.location.href);
      url.searchParams.set("id", this.dataset.produtoId);
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

  const slides = banner.querySelectorAll(".slide");
  const dots = banner.querySelectorAll(".bola");

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

  let startX = 0;
  const swipeThreshold = 50;

  banner.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  banner.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        trocarSlide((index + 1) % slides.length);
      } else {
        trocarSlide((index - 1 + slides.length) % slides.length);
      }
      resetInterval();
    }
  });
}

// ============ SEGUNDO CARROSSEL (track - produtos adicionais) ============
function criarCarrossel(trackSelector, produtos, idBtnAvancar, idBtnVoltar, visiveis = 3) {
  const track = document.querySelector(trackSelector);
  const btnAvancar = document.getElementById(idBtnAvancar);
  const btnVoltar = document.getElementById(idBtnVoltar);

  if (!track || !btnAvancar || !btnVoltar || !produtos || produtos.length === 0) {
    console.warn("Elemento não encontrado ou sem produtos para o carrossel:", trackSelector);
    return;
  }

  let page = visiveis;
  const extended = [
    ...produtos.slice(-visiveis),
    ...produtos,
    ...produtos.slice(0, visiveis)
  ];

  track.innerHTML = '';

  extended.forEach((p, index)=> {
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
        page++; 
      } else {
        page--; 
      }
    }

    if (page >= produtos.length + visiveis) {
      page = visiveis;
      update(false);
    }
    if (page < visiveis) {
      page = produtos.length + visiveis - 1;
      update(false);
    }
    update();
  });

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const maxPage = produtos.length + visiveis - 1;
      if (page > maxPage) page = maxPage;
      if (page < visiveis) page = visiveis;
      update(false); 
    }, 150);
  });

  btnAvancar.addEventListener("click", () => {
    page++;
    update();
    if (page >= produtos.length + visiveis) {
      setTimeout(() => {
        page = visiveis;
        update(false);
      }, 300);
    }
  });

  btnVoltar.addEventListener("click", () => {
    page--;
    update();
    if (page < visiveis) {
      setTimeout(() => {
        page = produtos.length + visiveis - 1;
        update(false);
      }, 300);
    }
  });

  window.addEventListener("load", () => setTimeout(update, 100));
  setTimeout(update, 100);
}

// ============ GRADE PRINCIPAL (Galeria) ============
function initGaleria(Galeria) {
  const tota = document.querySelector(".total");
  if (!tota) return;
  tota.innerHTML = '';

  Galeria.forEach(item => {
    const itema = document.createElement("div");
    itema.classList.add("itema");
    itema.dataset.produtoId = item.id;

    itema.innerHTML = `
        <div class="card-image">
            <img src="${item.url}" alt="Terreno" loading="lazy">
            <span class="price-badge">R$ ${item.preco}</span>
        </div>
        <div class="card-body">
            <span class="terrain-type">${item.tipo}</span>
            <div class="location">📍 ${item.local}</div>
            <div class="dimensions-grid">
                <div class="dim-item">
                    <div class="dim-label">Frente</div>
                    <div class="dim-value">${item.frente}<span class="dim-unit">m</span></div>
                </div>
                <div class="dim-item">
                    <div class="dim-label">Profund.</div>
                    <div class="dim-value">${item.profundidade}<span class="dim-unit">m</span></div>
                </div>
                <div class="dim-item">
                    <div class="dim-label">Área</div>
                    <div class="dim-value">${item.area}</div>
                </div>
            </div>
            <button class="btnConsulte">Consulte</button>
        </div>
    `;

    itema.addEventListener("click", function () {
      const id = this.dataset.produtoId;
      const url = new URL("compra/compra.html", window.location.href);
      url.searchParams.set("id", id);
      window.location.href = url.toString();
    });

    tota.appendChild(itema);
  });
}