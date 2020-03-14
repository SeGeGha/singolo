window.addEventListener('load', () => {
/*HEADER SCROLL AND ADD/REMOVE CLASS ACTIVE*/

let navigation = document.querySelector('.navigation');

navigation.addEventListener('click', (event) => {
  let nameScrollSection = event.target.innerText.toLowerCase();

  addActiveClass(navigation, 'li', 'item_active', event.target);
  document.querySelector(`#${nameScrollSection}`).scrollIntoView({behavior: 'smooth', block: 'start'});
});


/*SLIDER*/
let phones = document.querySelectorAll('.phone');
let carousel = document.querySelector('.carousel')
let slides = carousel.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  (carousel.classList.contains('carousel_colored')) ? carousel.classList.remove('carousel_colored')
                                                    : carousel.classList.add('carousel_colored');
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
  hideSlide('to-left');
  changeCurrentSlide(currentSlide - 1);
  showSlide('from-right');
}

function nextSlide(n) {
  hideSlide('to-right');
  changeCurrentSlide(currentSlide + 1);
  showSlide('from-left');
}

document.querySelector('.button_left').addEventListener('click', function() {
  if(isEnabled) {
    previousSlide(currentSlide);
  }
})

document.querySelector('.button_right').addEventListener('click', function() {
  if(isEnabled) {
    nextSlide(currentSlide);
  }
})



phones.forEach(item => {
  item.addEventListener('click', (event) => {
    let screen = event.target.parentElement.querySelector('.phone-screen');
    (!screen.classList.contains('screen_off')) ? screen.classList.add('screen_off') 
                                               : screen.classList.remove('screen_off');  
  })
})



/*PORTFOLIO ADD/REMOVE CLASS ACTIVE AND MIX IMAGE*/

  let portfolioTages = document.querySelector('.buttons');
  let portfolio = document.querySelector('.layout-4-column');
  let portfolioImages = portfolio.querySelectorAll('div');  


  portfolioTages.addEventListener('click', (event) => {
    addActiveClass(portfolioTages, 'button', 'button_active', event.target);
    mixedImages();
  });

  portfolioImages.forEach (item => {
    item.addEventListener('click', () => addActiveClass(portfolio, 'div', 'image_active', item));
  })

function mixedImages() {
  portfolio.classList.add('portfolio_hidden');

  setTimeout( () => {
    portfolioImages.forEach( (item, index) => {
      item.style.order = (item.style.order != '') ? portfolioImages.length - item.style.order : portfolioImages.length - index;
    });  

    portfolioImages.forEach (item => item.classList.remove('image_active'));
          
    portfolio.classList.remove('portfolio_hidden');
  }, 350)
}


/*GET QUOTE POPUP*/

let form = document.querySelector('.form');
let [inputName, inputEmail, formSubject] = form.querySelectorAll('input');
let formTextarea = form.querySelector('textarea');
let popup = document.querySelector('.popup');

let nameRegExp = /^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/;
let emailRegExp = /^[A-Z0-9._%+-]+@[A-Z]{2,8}$/i;

inputName.addEventListener('change', () => {
  checkInputValue(inputName, nameRegExp);
})

inputEmail.addEventListener('change', () => {
  checkInputValue(inputEmail, emailRegExp);
})

function checkInputValue(elem, reg) {
  (reg.test(elem.value)) ? elem.classList.remove('input_invalid')
                         : elem.classList.add('input_invalid');
}

form.querySelector('.input_submit').addEventListener('click', () => {
  checkInputValue(inputName, nameRegExp);
  checkInputValue(inputEmail, emailRegExp);

  if (inputName.classList == 'form__input' && inputEmail.classList == 'form__input') {
    popup.parentElement.classList.remove('popup_hidden');

    if(formSubject.value !== '') {
      popup.querySelector('.popup__subject').innerText = `Тема: ${formSubject.value}`;
    }
    if(formTextarea.value !== '') {
      popup.querySelector('.popup__describe').innerText = `Описание: ${formTextarea.value}`;
    } 
  }
})

popup.querySelector('button').addEventListener('click', (event) => {
  [inputName, inputEmail, formSubject, formTextarea].forEach( item => item.value = '');
  popup.querySelector('.popup__subject').innerText = 'Без темы';
  popup.querySelector('.popup__describe').innerText = 'Без описания';
  popup.parentElement.classList.add('popup_hidden');
})

/*FUNCTION*/


function addActiveClass(element, selector, className, targetElement) {
  element.querySelectorAll(selector).forEach( item => item.classList.remove(className));
  targetElement.classList.add(className);
}

})