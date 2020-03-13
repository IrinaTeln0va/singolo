// navigation

const navList = document.querySelector('.nav-list');

navList.addEventListener('click', (evt) => {
    navList.querySelectorAll('.service-link').forEach((link) => link.classList.remove('active'));
    evt.target.classList.add('active');
});

// slider

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

const mockup = document.querySelectorAll('.mockup-1-wrap');

mockup.forEach(item => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('phone-shadow')) {
            return;
        }
        item.classList.toggle('mockup-disabled');
    })
});

// filters

const filtersList = document.querySelectorAll('.filter-btn');
const portfolioWrap = document.querySelector('.portfolio-projects');
const SHIFT_IMAGE = 4;

const onFilterClick = (evt) => {
    filtersList.forEach(item => item.classList.remove('active'));
    evt.target.classList.add('active');

    const portfolioList = [...portfolioWrap.children];
    portfolioWrap.append(...portfolioList.slice(0, SHIFT_IMAGE));
}

filtersList.forEach((filter) => {
    filter.addEventListener('click', onFilterClick);
});