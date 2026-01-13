const imagensProduto = [
  { url: "../imagens/ert.jpeg", link: "Painel/Painel.html", area: "250 m²", local: "Picos R. Santos", preco: "210.000" },
  { url: "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg", link: "Painel/Painel.html", area: "180 m²", local: "Centro",preco: "175.000"},
  { url: "../imagens/767267443391f57f2eb6949319d1f0a0.jpg", link: "Painel/Painel.html", area: "320 m²",local: "Bairro Junco",preco: "295.000"}
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
    <div class="linha"> <svg width="32" height="19" viewBox="0 0 32 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.10907 8.28143L16.1091 17.7814L31.1091 8.28143L16.1091 0.281433L0.10907 8.28143Z" fill="#FFF0F0"/>
<path d="M4.10907 11.2014L16.1091 18.2014" stroke="#000000ff" stroke-width="0.5"/>
<path d="M28.178 10.3867L16.0402 18.1761" stroke="#000000ff" stroke-width="0.5"/>
<path d="M0.10907 8.28143L16.6091 0.281433L31.1091 8.28143" stroke="#460606" stroke-width="0.5"/>
</svg>

 ${img.area}</div>
    <div class="linha"><svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
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
 ${img.local}</div>
    <div class="preco">R$ ${img.preco}</div>
  `;

   slide.appendChild(info);

  slide.addEventListener("click", () => {
    location.href = img.link;
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