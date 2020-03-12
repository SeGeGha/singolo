/*HEADER SCROLL AND ADD/REMOVE CLASS ACTIVE*/

let navigation = document.querySelector('.navigation');

navigation.addEventListener('click', (event) => {
  let nameScrollSection = event.target.innerText.toLowerCase();

  addActiveClass(navigation, 'li', 'item_active', event.target);
  document.querySelector(`#${nameScrollSection}`).scrollIntoView({behavior: 'smooth', block: 'start'});
});


/*SLIDER*/


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

  
function addActiveClass(element, selector, className, targetElement) {
  element.querySelectorAll(selector).forEach( item => item.classList.remove(className));
  targetElement.classList.add(className);
}

function mixedImages() {
  portfolio.style.opacity = 0;

  setTimeout( () => {
    portfolioImages.forEach( (item, index) => {
      item.style.order = (item.style.order != '') ? portfolioImages.length - item.style.order : portfolioImages.length - index;
    });  

    portfolioImages.forEach (item => item.classList.remove('image_active'));
          
    portfolio.style.opacity = 1
  }, 350)
}
