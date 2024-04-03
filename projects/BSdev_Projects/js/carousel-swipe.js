let startX, endX;
const threshold = 100; // Minimum distance of swipe to trigger slide move

const carouselInner = document.querySelector(".carousel-inner");

carouselInner.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carouselInner.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

carouselInner.addEventListener('touchend', () => {
  if (startX - endX > threshold) {
    carouselInner.scrollBy({ left: getScrollAmount() * (window.innerWidth <= 768 ? 1 : 3), behavior: "smooth" });
  } else if (endX - startX > threshold) {
    carouselInner.scrollBy({ left: -getScrollAmount() * (window.innerWidth <= 768 ? 1 : 3), behavior: "smooth" });
  }
});
