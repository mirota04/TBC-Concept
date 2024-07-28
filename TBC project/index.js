const swiperWrapper = document.querySelector(".swiper_wrapper");
const swiperScrollbar = document.querySelector(".swiper_scrollbar");
const swiperScrollbarDrag = document.querySelector(".swiper_scrollbar_drag");
const swiperLeftArrow = document.getElementById("swiper_left_arrow");
const swiperRightArrow = document.getElementById("swiper_right_arrow");
const productCard = document.querySelectorAll(".product_card");
const prizeCard = document.querySelectorAll(".prize_card");
const sliderScrollAmount = swiperScrollbar.getBoundingClientRect().width / 3;

main();

// Functions
function main() {
  addScrollFunctionality();
  listenToMouseEventsOnSwiperWrapper();
  updateArrows();
  listenToNavigationalArrowclicks();
}

function addScrollFunctionality() {
  document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll_conteiner");

    scrollContainer.addEventListener("wheel", function (e) {
      e.preventDefault();
      scrollContainer.scrollTo({
        top: scrollContainer.scrollTop + e.deltaY,
        behavior: "instant",
      });
    });
  });
}

function listenToMouseEventsOnSwiperWrapper() {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  swiperWrapper.addEventListener("scroll", updateScrollbarPosition);

  swiperWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - swiperWrapper.offsetLeft;
    scrollLeft = swiperWrapper.scrollLeft;
    swiperWrapper.classList.add("active");
    setProductCardCursor("grabbing");
    setPrizeCardCursor("grabbing");
  });

  swiperWrapper.addEventListener("mouseleave", () => {
    isDown = false;
    setProductCardCursor("pointer");
    setPrizeCardCursor("pointer");
  });

  swiperWrapper.addEventListener("mouseup", () => {
    isDown = false;
    setProductCardCursor("pointer");
    setPrizeCardCursor("pointer");
  });

  swiperWrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - swiperWrapper.offsetLeft;
    const pace = (x - startX) * 2;
    swiperWrapper.scrollLeft = scrollLeft - pace;
    removeSmoothTransition(swiperScrollbarDrag);
    updateArrows();
    updateScrollbarPosition();
  });
}

function updateScrollbarPosition() {
  const wrapperScrollLeft = swiperWrapper.scrollLeft;
  const wrapperWidth = swiperWrapper.scrollWidth;
  const visibleWidth = swiperWrapper.clientWidth;
  const scrollbarWidth = swiperScrollbar.clientWidth;
  const dragWidth = swiperScrollbarDrag.clientWidth;
  const maxDragLeft = scrollbarWidth - dragWidth;
  const maxScrollLeft = wrapperWidth - visibleWidth;
  const dragLeft = (wrapperScrollLeft / maxScrollLeft) * maxDragLeft;
  applySmoothTransition(swiperScrollbarDrag);
  swiperScrollbarDrag.style.transform = `translate3d(${dragLeft}px, 0, 0)`;
}

function scrollContent(amount) {
  swiperWrapper.scrollLeft += amount;
  updateArrows();
  updateScrollbarPosition();
}

function applySmoothTransition(element) {
  element.style.transition = "transform 0.5s ease";
}

function removeSmoothTransition(element) {
  element.style.transition = "none";
}

function updateArrows() {
  const maxScrollLeft = swiperWrapper.scrollWidth - swiperWrapper.clientWidth;
  swiperLeftArrow.classList.toggle(
    "swiper_button_disabled",
    swiperWrapper.scrollLeft === 0
  );
  swiperRightArrow.classList.toggle(
    "swiper_button_disabled",
    swiperWrapper.scrollLeft >= maxScrollLeft
  );
}

setProductCardCursor = (value) => {
  for (let i = 0; i < productCard.length; i++) {
    productCard[i].style.cursor = value;
  }
};

setPrizeCardCursor = (value) => {
    for (let i = 0; i < prizeCard.length; i++) {
      prizeCard[i].style.cursor = value;
    }
};

function listenToNavigationalArrowclicks() {
  swiperLeftArrow.addEventListener("click", () => {
    scrollContent(-sliderScrollAmount);
  });

  swiperRightArrow.addEventListener("click", () => {
    scrollContent(sliderScrollAmount);
  });
}
