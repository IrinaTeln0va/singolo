window.onload = function () {
        // navigation

    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.main-header');
    const navLinksList = header.querySelectorAll('.service-link');
    let clickedScrollTarget = null;

    document.addEventListener('scroll', pageScrollHandler);
    navList.addEventListener('click', navLinkClickHandler);

    function pageScrollHandler() {
        if (clickedScrollTarget) {
            if (!isScrollTargetReached(clickedScrollTarget)) {
                // clickedScrollTarget = null;
                return;
            }
        }
        clickedScrollTarget = null;
        navLinksList.forEach((link) => {
            const scrollTarget = getScrollTarget(link);
            if (isScrollTargetReached(scrollTarget)) {
                highlightActiveLink(link);
            }
        });
    };

    function navLinkClickHandler(evt) {
        evt.preventDefault(); 

        clickedScrollTarget = getScrollTarget(evt.target);
        scrollPageToTarget(clickedScrollTarget);

        highlightActiveLink(evt.target);
    };

    function getScrollTarget(link) {
        return document.querySelector(`${link.getAttribute('href')}`);
    }

    function isScrollTargetReached(scrollTarget) {
        const scrollTargetTopPosition = scrollTarget.offsetTop;
        const scrollTargetBottomPosition = scrollTargetTopPosition + scrollTarget.offsetHeight
        const offset = header.offsetHeight + 10;
        if (window.pageYOffset + offset >= scrollTargetTopPosition &&
            window.pageYOffset + offset < scrollTargetBottomPosition) {
                return true;
        }
    }

    function highlightActiveLink(activeLink) {
        navLinksList.forEach((link) => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    function scrollPageToTarget(target) {
        const offset = header.offsetHeight;
        const coordYScrollTo = target.offsetTop - offset;
        window.scrollTo(0, coordYScrollTo);
    }

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
    let isPicturesAnimating = false;

    const onFilterClick = (evt) => {
        if (isPicturesAnimating) {
            return;
        }
        isPicturesAnimating = true;
        filtersList.forEach(item => item.classList.remove('active'));
        evt.target.classList.add('active');
        const portfolioList = Array.from(portfolioWrap.querySelectorAll('.portfolio-item'));
        [...portfolioWrap.children].forEach((elem) => elem.style.opacity = 0);
        portfolioWrap.children[1].addEventListener('transitionend', () => {
            if (portfolioWrap.children[1].style.opacity == 1) {
                isPicturesAnimating = false;
                return;
            }
            portfolioWrap.append(...portfolioList.sort((a, b) => Math.random() - 0.5));
            setTimeout(() => {
                [...portfolioWrap.children].forEach((elem) => elem.style.opacity = 1);
            }, 0);
            
        });
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

    const generateMessageContent = (title, descr) => {
        return `<div class="messageInner"><h3 class="message-title">Письмо отправлено</h3>
    <div class="message-subject">${ title ? `Тема: <span class="insertedTitle insertedText"></span>` : `Без темы`}</div>
    <div class="message-descr">${ descr ? `Описание: <span class="insertedDescr insertedText"></span>` : `Без описания`}</div>
    <button class="message-btn" type="button">OK</button></div>`
    }

    const createMessageElem = (titleText, descrText) => {
        messageElement = document.createElement('div');
        messageElement.classList.add('overlay');
        messageElement.innerHTML = `${generateMessageContent(titleText, descrText)}`;
        const elemForTitle = messageElement.querySelector('.insertedTitle');
        const elemForDescr = messageElement.querySelector('.insertedDescr');
        if (elemForTitle) {
            elemForTitle.innerText = titleText;
        }
        if (elemForDescr) {
            elemForDescr.innerText = descrText;
        }
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

    // mobile menu

    const burgerMenuBtn = document.querySelector('.burger-btn');

    burgerMenuBtn.addEventListener('click', () => {
        header.classList.toggle('header-menu-active');
    });
};