const slidesContainer = document.querySelector('.slides-list');
const rightArrow = document.querySelector('.arrow-right');
const leftArrow = document.querySelector('.arrow-left');
const parentContainer = document.querySelector('.slider');

function nextSlide() {
    slidesContainer.append(slidesContainer.firstElementChild);
    slidesContainer.classList.remove('next-slide');
    isAnimating = false;
}

function prevSlide() {
    slidesContainer.prepend(slidesContainer.lastElementChild);
    slidesContainer.classList.remove('prev-slide');
    isAnimating = false
}

let isAnimating = false;

rightArrow.addEventListener('click', () => {
    if (isAnimating) {
        return;
    }
    isAnimating = true;
    slidesContainer.classList.add('next-slide');
    parentContainer.classList.toggle('slider--bg-blue');
    slidesContainer.addEventListener('transitionend', nextSlide, { once: true });
});

leftArrow.addEventListener('click', () => {
    if (isAnimating) {
        return;
    }
    isAnimating = true;
    slidesContainer.classList.add('prev-slide');
    parentContainer.classList.toggle('slider--bg-blue');
    slidesContainer.addEventListener('transitionend', prevSlide, { once: true });
});

const mockup = [...document.querySelectorAll('.mockup-1-wrap')];

mockup.forEach(item => item.addEventListener('click', () => item.classList.toggle('mockup-disabled')));