'use strict';

const Bars = require('../base/Bars.js');
const { TweenMax, TweenLite, Bounce, Power1 } = require('gsap');
const eventsList = require('../config/eventsList.js');
const customEvents = require('../config/customEvents.js');

const buttonTypes = {
    home: `button-home`,
    soundOn: `button-sound-on`
};
const pressedButtonTypes = {
    home: `button-home`,
    soundOn: `button-sound-off`
};

class TopBar extends Bars {

    constructor(cssClass) {
        super(cssClass);

        this.buttonsContainer = document.createElement(`div`);
        this.buttonsContainer.classList.add(`buttons-container`);
        this.container.appendChild(this.buttonsContainer);

        this.buttons = [];

        this.logoElement = this.loadLogo();

        this.loadButtons();
    }

    loadLogo() {
        let logoElement = document.createElement(`div`);
        logoElement.classList.add(`logo-container`);
        logoElement.setAttribute(`title`, 'Hangman');
        logoElement.innerHTML = `<img src="./assets/images/Hangman3Dcolor.png" class="logo-img" alt="Hangman">`;

        this.container.appendChild(logoElement);

        setInterval(() => {
            TweenMax.to(logoElement, 1, {
                scaleX: 1.2,
                scaleY: 1.2,
                width: -5,
                ease: Power1.easeInOut,
                repeat: 1,
                yoyo: true
            });
        }, 60000);

        return this.container.querySelector('.logo-img');
    }

    loadButtons() {
        Object.keys(buttonTypes).forEach(type => {
            let topButton = document.createElement(`div`),
                image = document.createElement(`img`);

            image.setAttribute(`title`, buttonTypes[type]);
            image.setAttribute(`class`, buttonTypes[type]);
            image.setAttribute(`src`, `./assets/images/${buttonTypes[type]}.png`);

            image.classList.add(buttonTypes[type]);

            this.buttons.push(image);

            topButton.appendChild(image);
            this.buttonsContainer.appendChild(topButton);
        });

        this.loadButtonsListeners();
    }

    loadButtonsListeners() {
        let buttons = Object.keys(buttonTypes),
            pressedButtons = Object.keys(pressedButtonTypes);

        this.buttons.forEach((button, index) => {
            button.addEventListener(eventsList.mouseEvents.CLICK, (e) => {
                if (buttonTypes[buttons[index]] !== pressedButtonTypes[pressedButtons[index]]) {
                    button.classList.toggle(buttonTypes[buttons[index]]);
                    button.classList.toggle(pressedButtonTypes[pressedButtons[index]]);

                    if (button.src.includes(buttonTypes[buttons[index]])) {
                        button.src = `./assets/images/${pressedButtonTypes[pressedButtons[index]]}.png`;
                        button.title = pressedButtonTypes[pressedButtons[index]];
                    } else {
                        button.src = `./assets/images/${buttonTypes[buttons[index]]}.png`;
                        button.title = buttonTypes[buttons[index]];
                    }
                }

                TweenMax.to(button, 0.1, {
                    scaleX: 0.8,
                    scaleY: 0.8,
                    yoyo: true,
                    repeat: 1
                });

                this.emit(customEvents.bars.TOP_BARS_BUTTON_CLICK, {
                    button: button,
                    class: button.classList.item(0)
                });
                console.warn('PRESSED', button.classList.item(0)); // TODO delete
            });
        });
    }

    resizeButtons() {
        let newSize = Math.min(this.buttons[0].parentElement.clientWidth, this.buttons[0].parentElement.clientHeight),
            logoWidth = 776,
            logoHeight = 366,
            logoRatio = logoWidth / logoHeight,
            newLogoHeight = this.logoElement.parentElement.clientHeight,
            newLogoWidth = newLogoHeight * logoRatio;

        TweenMax.to(this.buttons, 0.5, {
            width: newSize,
            height: newSize,
        });

        TweenMax.to(this.logoElement, 0.5, {
            width: newLogoWidth,
            height: newLogoHeight,
        });
    }
}

module.exports = TopBar;