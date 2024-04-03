document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector(".carousel-inner");

    let startX;
    const threshold = 50; // Minimum distance of swipe to trigger the slide move

    function getScrollAmount() {
        const card = document.querySelector(".card");
        const style = window.getComputedStyle(card);
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        const scrollAmount = card.offsetWidth + margin;
        return scrollAmount;
    }

    carouselInner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carouselInner.addEventListener('touchmove', (e) => {
        const moveX = e.touches[0].clientX;
        const diffX = startX - moveX;

        if (Math.abs(diffX) >= threshold) {
            if (diffX > 0) {
                // Swiped left
                carouselInner.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
            } else {
                // Swiped right
                carouselInner.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
            }
            startX = moveX;
        }
    }, { passive: true });
});

