(function(){
    let burgerButton = document.querySelector('.ltburger');
    let burgerTop = document.querySelector('.burger-top');
    let body = document.body;
    let burgerBottom = document.querySelector('.burger-bottom');
    let menuMobile = document.querySelector('.ltmenu__mobile');
    let dark = document.querySelector('.ltdark-burger');
    let onBurgerButtonClick = function () {
        burgerButton.classList.toggle('ltburger-close');
        body.classList.toggle('menuMobile-open_body-overflow');
        menuMobile.classList.toggle('ltmenu__mobile-active');
        dark.classList.toggle('ltdark-active');
    }
    burgerButton.addEventListener('click', onBurgerButtonClick);
})()