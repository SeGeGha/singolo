window.addEventListener('load', () => {
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HEADER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  let header = document.querySelector('.header');
  let li = document.querySelectorAll('.navigation__item');
  let burgerEnable = false;

  header.querySelector('.burger-menu__button').addEventListener('click', () => {
    burgerActive();
  });

  li.forEach( (item) => {
    item.addEventListener('click', () => {
      if (burgerEnable) {
        burgerActive();
      }
    });    
  });

  function burgerActive() {
    burgerEnable = !burgerEnable;
    document.querySelector('.header__navigation').classList.toggle('burger_active');
    document.querySelector('.burger__overlay').classList.toggle('burger_active');
    document.querySelector('.logo').classList.toggle('logo_moved');   
    document.querySelector('.burger-menu__button').classList.toggle('burger-menu__button_active'); 
  }

  document.addEventListener('scroll', onScroll);

  function onScroll() {
    let currentPosition = window.scrollY + header.offsetHeight;
    let pageSections = document.querySelectorAll('section');
    let links = document.querySelectorAll('.header__navigation a');

    pageSections.forEach( (item) => {
      if (item.offsetTop <= currentPosition && (item.offsetTop + item.offsetHeight) > currentPosition) {
        links.forEach( (a) => {
          a.classList.remove('item_active');
          if (item.getAttribute('id') === a.getAttribute('href').substring(1)) {
            a.classList.add('item_active');
          }
        });
      }
    });

    if(window.scrollY <= header.offsetHeight) {
      header.classList.remove('header_transparency');
    } else {
      header.classList.add('header_transparency');
    }
  }

  document.querySelector('.logo').addEventListener('click', (event) => {
    event.preventDefault();
  });

  document.querySelector('.burger-menu__button').addEventListener('click', (event) => {
    event.target.classList.toggle('menu_active');
    document.querySelector('.logo').classList.toggle('logo_move');
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

      screen.classList.toggle('screen_off');
    });
  });
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PORTFOLIO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  let portfolioTages = document.querySelector('.buttons');
  let portfolio = document.querySelector('.portfolio .layout-4-column');
  let portfolioImages = portfolio.querySelectorAll('div');  
  let arr = [];

  portfolioTages.addEventListener('click', (event) => {
    if (!event.target.classList.contains('button_active')) {
      portfolioTages.querySelectorAll('button').forEach( item => item.classList.remove('button_active'));
      event.target.classList.add('button_active');
      shuffleImages();  
    }    
  });

  portfolioImages.forEach ( (item) => {
    arr.push(item);
    item.addEventListener('click', () => {
      portfolioImages.forEach( item => item.classList.remove('image_active'));
      event.target.classList.add('image_active');      
    });
  });

  function shuffleImages() {
    portfolioImages.forEach( item => item.classList.remove('image_active'));
      
    while(portfolio.firstChild) {
      portfolio.removeChild(portfolio.firstChild);  
    }

    let currentIndex = portfolioImages.length;
    let temporaryValue, randomIndex;

    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      portfolio.appendChild(portfolioImages[randomIndex]);
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }

    arr.forEach(item => portfolio.appendChild(item));
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
});