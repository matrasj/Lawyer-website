const imagesContainer = document.querySelector(".images__container");
const closeIcon = document.querySelector(".close__icon");
const overlay = document.querySelector(".overlay");
const imagesModal = document.querySelector(".photos__modal");
const slides = document.querySelectorAll(".modal__image");
const nextSlideButton = document.querySelector(".next__photo");
const prevSlideButton = document.querySelector(".prev__photo");
const dotsContainer = document.querySelector(".dots__container");
// H A N D L I N G   P H O T O S   M O D A L

const openModal = () => {
  overlay.classList.remove("hidden");
  imagesModal.classList.remove("hide__smooth");
  imagesModal.classList.remove("hidden");
};

const closeModal = () => {
  overlay.classList.add("hidden");

  imagesModal.classList.add("hide__smooth");
  setTimeout(() => imagesModal.classList.add("hidden"), 500);
};

closeIcon.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// S L I D E R
const createDots = () => {
  for (let i = 0; i < slides.length; i++) {
    const html = `
      <div class="dot" data-slide="${i}"></div>
    `;

    dotsContainer.insertAdjacentHTML("beforeend", html);
  }
};

createDots();

let curSlide = 0;
let maxSlide = slides.length;

slides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const changeDot = (slide) => {
  dotsContainer
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot__active"));

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot__active");
};

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  changeDot(curSlide);
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  changeDot(curSlide);
  goToSlide(curSlide);
};

imagesContainer.addEventListener("click", (e) => {
  // clicking gallery
  const clicked = e.target.closest(".gallery__image");
  if (!clicked) return;

  console.log(clicked.dataset.number);

  openModal();
  goToSlide(+clicked.dataset.number);
  changeDot(+clicked.dataset.number);
});

dotsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".dot");
  if (!clicked) return;

  changeDot(+clicked.dataset.slide);
  goToSlide(+clicked.dataset.slide);
});

nextSlideButton.addEventListener("click", nextSlide);
prevSlideButton.addEventListener("click", prevSlide);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }

  if (e.key === "ArrowRight") {
    nextSlide();
  } else return;
});

// N A V   H A N D L I N G
const navLinksContainer = document.querySelector(".nav__links--container");

navLinksContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target.closest(".nav__link");
  if (!clicked) return;

  document.querySelector(`${clicked.getAttribute("href")}`).scrollIntoView({
    behavior: "smooth",
  });
});

// L O G O
document.querySelector("#logo__label").addEventListener("click", (e) => {
  document.querySelector(".hero__section").scrollIntoView({
    behavior: "smooth",
  });
});

// L E A R N   M O R E
document.querySelector(".learn__more").addEventListener("click", (e) => {
  document.querySelector("#about__office--section").scrollIntoView({
    behavior: "smooth",
  });
});

// R E S P O N I S V E   M E N U
document.querySelector(".toggle__button").addEventListener("click", (e) => {
  navLinksContainer.classList.toggle("active");
});
