;(function(){
    let switchBlock = document.querySelector('.switch');
    let switchButton = document.querySelector('.switch__button');
    let onSwitchButtonClick = function (evt) {
        evt.preventDefault();
        switchBlock.classList.toggle('switch-active');
    };
    switchButton.addEventListener('click', onSwitchButtonClick);


    let sliderBlock = document.querySelector('.slider');
    let sliderButton = document.querySelector('.slider__button');
    let sliderCircle = sliderButton.querySelector('.slider__circle');


    let sliderTransition = 250;
    let sliderImage = document.querySelector('.before-box');
    let MAX_TRANSITION, sliderOffsetX;
    let changeSliderData = function () {
        MAX_TRANSITION = sliderBlock.getBoundingClientRect().width;
        sliderOffsetX = sliderBlock.getBoundingClientRect().left;
        let part = sliderTransition / MAX_TRANSITION
        let hslOfCircle = `hsl(201, ${Math.floor(100 - 100 * part)}%, ${41 + Math.floor(36 * part)}%)`;
        sliderCircle.style.backgroundColor = hslOfCircle;
        let translateStr = `translateX(${sliderTransition}px)`;
        sliderCircle.style.transform = translateStr;
        sliderImage.style.width = `${100 * sliderTransition / MAX_TRANSITION}%`
    };
    changeSliderData();
    window.addEventListener('resize', changeSliderData);


    let changeSlider = function (mouseX) {
        sliderTransition = Math.floor(mouseX - sliderOffsetX);
        if (sliderTransition < 0) {
            sliderTransition = 0;
        }
        if (sliderTransition > MAX_TRANSITION) {
            sliderTransition = MAX_TRANSITION;
        }
        part = sliderTransition / MAX_TRANSITION;
        hslOfCircle = `hsl(201, ${Math.floor(100 - 100 * part)}%, ${41 + Math.floor(36 * part)}%)`;
        sliderCircle.style.backgroundColor = hslOfCircle;
        let translateStr = `translateX(${sliderTransition}px)`;
        sliderCircle.style.transform = translateStr;
        sliderImage.style.width = `${100 * sliderTransition / MAX_TRANSITION}%`
    }
    let onSliderButtonDown = function (evt) {
        let mouseX = evt.clientX;
        changeSlider(mouseX);
        let onSliderButtonMove = function (evt) {
            let mouseX = evt.clientX;
            changeSlider(mouseX);
        }
        window.addEventListener('mousemove', onSliderButtonMove);



        let onSliderButtonUp = function (evt) {
            window.removeEventListener('mousemove', onSliderButtonMove);
            window.removeEventListener('mouseup', onSliderButtonUp);
        };
        window.addEventListener('mouseup', onSliderButtonUp);
    }
    sliderButton.addEventListener('mousedown', onSliderButtonDown);



    let TYPE_FILES = ['gif', 'png', 'jpeg', 'jpg', 'svg', 'HEIC'];
    let changePhoto = function(input, photo1, photo2, photo3) {
        let file = input.files[0];
        let fileName = file.name.toLowerCase();
        let matches = TYPE_FILES.some(function(el){
          return fileName.endsWith(el);
        })
        if (matches) {
          let reader = new FileReader();
          reader.addEventListener('load', function(){
            photo1.src = reader.result;
            photo2.src = reader.result;
            photo3.src = reader.result;
            var myImage = new Image();
            myImage.src = photo2.src;
            myImage.onload = function () {
                console.log('width - ' + myImage.width);
                console.log('height - ' + myImage.height);
                if (myImage.width < MAX_TRANSITION && myImage.height < MAX_TRANSITION) {
                    if (myImage.width > myImage.height) {
                        let ourHeight = myImage.height * (MAX_TRANSITION / myImage.width);
                        photo2.style.width = `${MAX_TRANSITION}px`;
                        photo3.style.width = `${MAX_TRANSITION}px`;
                        photo2.style.height = `${ourHeight}px`;
                        photo3.style.height = `${ourHeight}px`;
                    }
                    else{
                        let ourWidth = myImage.width * (MAX_TRANSITION / myImage.height);
                        photo2.style.height = `${MAX_TRANSITION}px`;
                        photo3.style.height = `${MAX_TRANSITION}px`;
                        photo2.style.width = `${ourWidth}px`;
                        photo3.style.width = `${ourWidth}px`;
                    }
                }
            }
          });
          reader.readAsDataURL(file);
        }
        
    };

    let after = document.querySelector('#after');
    let afterMiniPhoto = document.querySelector('.after-input__box .mini__photo');
    let switchAfterPhoto = document.querySelector('.switch__after');
    let sliderAfterPhoto = document.querySelector('.slider__after');
    let onAfterChange = function () {
        changePhoto(after, afterMiniPhoto, switchAfterPhoto, sliderAfterPhoto);
    }   
    after.addEventListener('change', onAfterChange);
    let before = document.querySelector('#before');
    let beforeMiniPhoto = document.querySelector('.before-input__box .mini__photo');
    let switchBeforePhoto = document.querySelector('.switch__before');
    let sliderBeforePhoto = document.querySelector('.slider__before');
    let onBeforeChange = function () {
        changePhoto(before, beforeMiniPhoto, switchBeforePhoto, sliderBeforePhoto);
    }
    before.addEventListener('change', onBeforeChange);
})();