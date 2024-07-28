const swiperWrapper = document.querySelector(".swiper_wrapper");
const swiperWrapper2 = document.getElementById("second_swiper");
const swiperScrollbar = document.querySelector(".swiper_scrollbar");
const swiperScrollbar2 = document.getElementById("second_scrollbar");
const swiperScrollbarDrag = document.querySelector(".swiper_scrollbar_drag");
const swiperScrollbarDrag2 = document.getElementById("second_drag");
const swiperLeftArrow = document.getElementById("swiper_left_arrow");
const swiperLeftArrow2 = document.getElementById("swiper_left_arrow2");
const swiperRightArrow = document.getElementById("swiper_right_arrow");
const swiperRightArrow2 = document.getElementById("swiper_right_arrow2");
const productCard = document.querySelectorAll(".product_card");
const prizeCard = document.querySelectorAll(".prize_card");
const sliderScrollAmount = swiperScrollbar.getBoundingClientRect().width / 2.5;
const sliderScrollAmount2 = swiperScrollbar.getBoundingClientRect().width / 4;

main();

// Functions
function main() {
  addScrollFunctionality();
  listenToMouseEventsOnSwiperWrapper();
  listenToMouseEventsOnSwiperWrapper2();
  updateArrows();
  updateArrows2();
  listenToNavigationalArrowclicks();
  listenToNavigationalArrowclicks2();
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
  });

  swiperWrapper.addEventListener("mouseleave", () => {
    isDown = false;
    setProductCardCursor("pointer");
  });

  swiperWrapper.addEventListener("mouseup", () => {
    isDown = false;
    setProductCardCursor("pointer");
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

function listenToMouseEventsOnSwiperWrapper2() {
  let isDown2 = false;
  let startX2 = 0;
  let scrollLeft2 = 0;

  swiperWrapper2.addEventListener("scroll", updateScrollbarPosition);

  swiperWrapper2.addEventListener("mousedown", (e) => {
    isDown2 = true;
    startX2 = e.pageX - swiperWrapper2.offsetLeft;
    scrollLeft2 = swiperWrapper2.scrollLeft;
    swiperWrapper2.classList.add("active");
    setPrizeCardCursor("grabbing");
  });

  swiperWrapper2.addEventListener("mouseleave", () => {
    isDown2 = false;
    setPrizeCardCursor("pointer");
  });

  swiperWrapper2.addEventListener("mouseup", () => {
    isDown2 = false;
    setPrizeCardCursor("pointer");
  });

  swiperWrapper2.addEventListener("mousemove", (e) => {
    if (!isDown2) return;
    const x = e.pageX - swiperWrapper2.offsetLeft;
    const pace = (x - startX2) * 2;
    swiperWrapper2.scrollLeft = scrollLeft2 - pace;
    removeSmoothTransition(swiperScrollbarDrag2);
    updateArrows2();
    updateScrollbarPosition2();
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

function updateScrollbarPosition2() {
  const wrapperScrollLeft = swiperWrapper2.scrollLeft;
  const wrapperWidth = swiperWrapper2.scrollWidth;
  const visibleWidth = swiperWrapper2.clientWidth;
  const scrollbarWidth = swiperScrollbar2.clientWidth;
  const dragWidth = swiperScrollbarDrag2.clientWidth;
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

function scrollContent2(amount) {
  swiperWrapper2.scrollLeft += amount;
  updateArrows2();
  updateScrollbarPosition2();
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

function updateArrows2() {
  const maxScrollLeft = swiperWrapper2.scrollWidth - swiperWrapper2.clientWidth;
  swiperLeftArrow2.classList.toggle(
    "swiper_button_disabled",
    swiperWrapper2.scrollLeft === 0
  );
  swiperRightArrow.classList.toggle(
    "swiper_button_disabled",
    swiperWrapper2.scrollLeft >= maxScrollLeft
  );
}

setProductCardCursor = (value) => {
  for (let i = 0; i < productCard.length; i++) {
    productCard[i].style.cursor = value;
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

function listenToNavigationalArrowclicks2() {
  swiperLeftArrow2.addEventListener("click", () => {
    scrollContent2(-sliderScrollAmount2);
  });

  swiperRightArrow2.addEventListener("click", () => {
    scrollContent2(sliderScrollAmount2);
  });
}