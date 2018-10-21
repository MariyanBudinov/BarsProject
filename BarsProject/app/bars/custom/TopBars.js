'use strict';

const Bars = require('../base/Bars.js');
const { TweenMax, TweenLite, Bounce, Power1 } = require('gsap');
const eventsList = require('../config/eventsList.js');
const customEvents = require('../config/customEvents.js');

const favicons = {
    volumeUp: `fa-volume-up`,
    microphone: `fa-microphone`
};
const faviconsPressed = {
    volumeOff: `fa-volume-off`,
    microphoneSlash: `fa-microphone-slash`
};

class TopBar extends Bars {

    constructor(cssClass) {
        super(cssClass)

        this.buttonsContainer = document.createElement(`div`);
        this.buttonsContainer.classList.add(`buttons-container`);
        this.container.appendChild(this.buttonsContainer);

        this.buttons = [];

        this.loadLogo();
        this.loadButtons();
    }

    loadLogo() {
        let logoElement = document.createElement(`div`);
        logoElement.classList.add(`logo-container`);
        logoElement.innerHTML = `<img src="./assets/images/Hangman3Dcolor.png" alt="Hangman">`;
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
        }, 60000)
    }

    loadButtons() {
        Object.keys(favicons).forEach(favicon => {
            let topButton = document.createElement(`div`);
            let topIcon = document.createElement(`i`);

            topButton.classList.add(`${favicons[favicon]}-button`);
            topIcon.classList.add(`fa`, favicons[favicon]);

            this.buttons.push(topIcon);

            topButton.appendChild(topIcon);
            this.buttonsContainer.appendChild(topButton);
        });
        this.loadButtonsListeners();
    }

    loadButtonsListeners() {
        let faviconsClasses = Object.keys(favicons);
        let faviconsPressedClasses = Object.keys(faviconsPressed);

        this.buttons.forEach((button, index) => {
            button.addEventListener(eventsList.mouseEvents.CLICK, (e) => {
                button.classList.toggle(favicons[faviconsClasses[index]]);
                button.classList.toggle(faviconsPressed[faviconsPressedClasses[index]]);
                this.emit(customEvents.bars.TOP_BARS_BUTTON_CLICK, {
                    button: button,
                    class: button.classList.item(1)
                });
                console.log('AAAAAAAAAAA', button.classList.item(1));
            });
        });
    }

    resizeButtons() {
        this.buttons.forEach(button => {
            // button.style.fontSize = `${this.buttonsContainer.clientHeight/1.2}px`;
            button.style.fontSize = `${Math.min(button.parentElement.clientHeight, button.parentElement.clientWidth)}px`;
        });
    }

}

module.exports = TopBar;