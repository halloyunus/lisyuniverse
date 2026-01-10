
/* ===============================
   gallery LIGHTBOX & 
================================ */



/* GALLERY SLIDER */
const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    showImage(index);
    lightbox.classList.add("active");
  });
});

prevBtn.addEventListener("click", () => {
  showImage(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  showImage(currentIndex + 1);
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// News Photo Slider
const slides = document.querySelectorAll('.news-slider img');
let currentSlide = 0;

slides[0].classList.add('active');

setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 4000);

// Copy Text Function
// function copyText(elementId) {
//   const text = document.getElementById(elementId).innerText;
//   navigator.clipboard.writeText(text).then(() => {
//     alert("Berhasil disalin ✅");
//   });
// }



