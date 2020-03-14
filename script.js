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
    const portfolioList = [...portfolioWrap.querySelectorAll('.portfolio-item')];
    portfolioWrap.append(...portfolioList.slice(0, SHIFT_IMAGE));
}

filtersList.forEach((filter) => {
    filter.addEventListener('click', onFilterClick);
});

// portfolio

portfolioWrap.addEventListener('click', (evt) => {
    portfolioWrap.querySelectorAll('.portfolio-item').forEach((item) => {
        item.classList.remove('active');
    });
    evt.target.parentElement.classList.add('active');
});

//form

const submitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('.request-form');

const generateMessageContent = (title = 'Без темы', descr ='Без описания') => {
    return `<div class="messageInner"><h3 class="message-title">Письмо отправлено</h3>
<div class="message-subject">${ title ? `Тема: <span class="insertedText">${title.toUpperCase()}` : `Без темы` }</div>
<div class="message-descr">${ descr ? `Описание: </span><span class="insertedText">${descr.toUpperCase() }` : `Без описания` }</div>
<button class="message-btn" type="button">OK</button></div>`
}

const createMessageElem = (titleText, descrText) => {
    messageElement = document.createElement('div');
    messageElement.classList.add('overlay');
    messageElement.innerHTML = `${generateMessageContent(titleText, descrText)}`;
    return messageElement;
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const titleText = document.querySelector('.subject-input').value;
    const descrText = document.querySelector('.desc-input').value;
    const messageElem = createMessageElem(titleText, descrText);

    form.append(messageElem);
    setTimeout(() => {
        messageElem.classList.add('animated');
    }, 0);

    addCloseHandler(messageElem);
});

const addCloseHandler = (messageElem) => {
    const messageBtn = document.querySelector('.message-btn');
    
    messageBtn.addEventListener('click', () => {
        form.reset();
        messageElem.remove();
    });
};

