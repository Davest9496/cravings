const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const arrowRight = document.querySelector(".slider__btn--right");
const arrowLeft = document.querySelector(".slider__btn--left");
const navBtn = document.querySelector(".navigation__button");


//SLIDER FUNCTION
const sliderFunction = function () {
  const maxSlide = slides.length;
  let currentSlide = 0;

  const goToSlide = function (slide) {
    slides.forEach(
      (frame, index) => (frame.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

  //DOT NAVIGATOR
  const dots = document.querySelector('.dots');
  const dotNavigator = function () {
    slides.forEach((_, index) =>
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      )
    );
  };
  const dotsNav = function (event) {
    const dot = event.target;
    const { slide } = event.target.dataset;
    if (dot.classList.contains('dots__dot')) goToSlide(slide);
    activeDot(slide);
  };
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(element => element.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"`)
      .classList.add('dots__dot--active');
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) return;
    currentSlide++;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };
  const previousSlide = function () {
    if (currentSlide === 0) return;
    currentSlide--;
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  //KEYBOARD NAVIGATOR
  const arrowNav = function (event) {
    //shortcircuiting
    event.key === 'ArrowRight' && nextSlide();
    event.key === 'ArrowLeft' && previousSlide();
  };

  arrowLeft.addEventListener('click', previousSlide);
  arrowRight.addEventListener('click', nextSlide);
  document.addEventListener('keydown', arrowNav);
  dots.addEventListener('click', dotsNav);

  const init = function () {
    goToSlide(0);
    dotNavigator();
    activeDot(0);
  };
  init();
};
sliderFunction();

//VIDEO SPEED
const video = document.getElementById("video");
video.playbackRate = 0.5;