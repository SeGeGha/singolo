window.addEventListener('load', () => {
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HEADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
let navigation = document.querySelector('.navigation');
let header = document.querySelector('.header');

navigation.addEventListener('click', (event) => {
  let nameScrollSection = event.target.innerText.toLowerCase();

  addActiveClass(navigation, 'li', 'item_active', event.target);
    
  document.querySelector(`#${nameScrollSection}`).scrollIntoView({behavior: 'smooth', block: 'start'});
});

window.addEventListener('scroll', () => {
  headerTransparency(window.pageYOffset, header.offsetHeight);
});

function headerTransparency(offsetY, headerOffsetHeight) {
  if(offsetY <= headerOffsetHeight) {
    header.classList.remove('header_transparency');
  } else {
    header.classList.add('header_transparency');
  }
}

document.querySelector('.logo').addEventListener('click', (event) => {
  event.preventDefault();
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CAROUSEL~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
let phones = document.querySelectorAll('.phone');
let carousel = document.querySelector('.carousel');
let slides = carousel.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  if (carousel.classList.contains('carousel_colored')) {
    carousel.classList.remove('carousel_colored');
  }else {
    carousel.classList.add('carousel_colored');
  }
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('slide_active', direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add('slide_next', direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('slide_next', direction);
    this.classList.add('slide_active');
    isEnabled = true;
  });
}

function previousSlide(n) {
  hideSlide('to-right');
  changeCurrentSlide(n - 1);
  showSlide('from-left');
}

function nextSlide(n) {
  hideSlide('to-left');
  changeCurrentSlide(n + 1);
  showSlide('from-right');
}

document.querySelector('.button_left').addEventListener('click', function() {
  if(isEnabled) {
    previousSlide(currentSlide);
  }
});

document.querySelector('.button_right').addEventListener('click', function() {
  if(isEnabled) {
    nextSlide(currentSlide);
  }
});

phones.forEach(item => {
  item.addEventListener('click', (event) => {
    let screen = event.target.parentElement.querySelector('.phone-screen');

    screen.classList.toggle('screen_off')
  });
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PORTFOLIO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

let portfolioTages = document.querySelector('.buttons');
let portfolio = document.querySelector('.layout-4-column');
let portfolioImages = portfolio.querySelectorAll('div');  

portfolioTages.addEventListener('click', (event) => {
  addActiveClass(portfolioTages, 'button', 'button_active', event.target);
  mixedImages();      
});

portfolioImages.forEach ( (item, index) => {
  item.style.order = index;
  item.addEventListener('click', () => addActiveClass(portfolio, 'div', 'image_active', item));
});

function mixedImages() {
  portfolio.classList.add('portfolio_hidden');

  setTimeout( () => {
    portfolioImages.forEach( (item) => {
      let offsetImages = portfolioImages.length - 4;

      item.style.order = (item.style.order < offsetImages) ? +item.style.order + 4 
                                                           : item.style.order = item.style.order - offsetImages;
    });  

    portfolioImages.forEach (item => item.classList.remove('image_active'));        
    portfolio.classList.remove('portfolio_hidden');
  }, 350);
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GET QUOTE POPUP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

let form = document.querySelector('.form');
let [inputName, inputEmail, formSubject] = form.querySelectorAll('input');
let formTextarea = form.querySelector('textarea');
let popup = document.querySelector('.popup');

let nameRegExp = /^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/;
let emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

inputName.addEventListener('change', () => {
  checkInputValue(inputName, nameRegExp);
});

inputEmail.addEventListener('change', () => {
  checkInputValue(inputEmail, emailRegExp);
});

function checkInputValue(elem, reg) {
  if(reg.test(elem.value)) {
    elem.classList.remove('input_invalid');   
  } else {
    elem.classList.add('input_invalid');   
  }
}

form.querySelector('.input_submit').addEventListener('click', () => {
  checkInputValue(inputName, nameRegExp);
  checkInputValue(inputEmail, emailRegExp);

  if (!inputName.classList.contains('input_invalid') && !inputEmail.classList.contains('input_invalid')) {
    popup.parentElement.classList.remove('popup_hidden');

    if(formSubject.value !== '') {
      popup.querySelector('.popup__subject').innerText = `Subject: ${formSubject.value}`;
    }
    if(formTextarea.value !== '') {
      popup.querySelector('.popup__describe').innerText = `Description: ${formTextarea.value}`;
    } 
  }
});

popup.querySelector('button').addEventListener('click', () => {
  [inputName, inputEmail, formSubject, formTextarea].forEach( item => item.value = '');
  popup.querySelector('.popup__subject').innerText = 'Without subject';
  popup.querySelector('.popup__describe').innerText = 'Without description';
  popup.parentElement.classList.add('popup_hidden');
});


/*FUNCTION*/
function addActiveClass(element, selector, className, targetElement) {
  element.querySelectorAll(selector).forEach( item => item.classList.remove(className));
  targetElement.classList.add(className);
}

});