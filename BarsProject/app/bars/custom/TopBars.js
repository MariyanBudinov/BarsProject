'use strict';

const Bars = require('../base/Bars.js');
const { TweenMax, TweenLite, Bounce, Power1 } = require('gsap');

class TopBar extends Bars {

    constructor(cssClass) {
        super(cssClass)

        this.loadLogo();
    }

    loadLogo() {
        let logoElement = document.createElement(`div`);
        logoElement.classList.add('logo-container');
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

}

module.exports = TopBar;