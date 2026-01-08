const imagensProduto = [
  "../imagens/post_thumbnail-9c4db417cdb6db7b1f98e300bdaf5121.jpg",
 "../imagens/ert.jpeg",
  "../imagens/33300d20f8ec0b140b543fbf6d5a7fa4.jpg",
];

const banner = document.querySelector(".banner");
imagensProduto.forEach((img, i) => {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  if (i === 0) slide.classList.add("active");
  slide.style.backgroundImage = `url(${img})`;
  banner.appendChild(slide);
});

const slides = document.querySelectorAll(".slide");

if (slides.length > 1) {//só funciona ser tive mais que um slide utilizando para length
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active"); // remove active para ativa de novo com proximo slide
    index = (index + 1) % slides.length;
    slides[index].classList.add("active"); // <---- actie da linha 22
  }, 4000);
}
