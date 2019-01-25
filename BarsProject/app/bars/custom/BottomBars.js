'use strict';

const Bars = require('../base/Bars.js');
const { TweenMax, TweenLite, Bounce, Power1 } = require('gsap');
const eventsList = require('../config/eventsList.js');
const customEvents = require('../config/customEvents.js');

class BottomBars extends Bars {

    constructor(cssClass) {
        super(cssClass);

        this.playButton = this.createPlayButton();
        this.loadEventListeners();
    }

    createPlayButton() {
        let playButtonContainer = document.createElement(`div`),
            playButton = document.createElement(`img`);

        playButtonContainer.setAttribute(`class`, `button-play-container`);
        playButton.setAttribute(`title`, `PLAY`);
        playButton.setAttribute(`class`, `button-play`);
        playButton.setAttribute(`src`, `./assets/images/button-play.png`);

        playButtonContainer.appendChild(playButton);
        this.container.appendChild(playButtonContainer);

        return playButton;
    }

    loadEventListeners() {
        this.playButton.addEventListener(eventsList.mouseEvents.CLICK, (e) => {
            TweenMax.to(this.playButton, 0.1, {
                scaleX: 0.8,
                scaleY: 0.8,
                yoyo: true,
                repeat: 1
            });

            this.emit(customEvents.bars.BOTTOM_BARS_PLAY_BUTTON_CLICK, {
                button: this.playButton,
                class: this.playButton.classList.item(0)
            });
            console.log('BBBBBBBBBB', this.playButton.classList.item(0)); // TODO delete
        });
    }

    resizeButtons() {
        let newSize = Math.min(this.playButton.parentElement.clientWidth, this.playButton.parentElement.clientHeight),
            newX = (this.playButton.parentElement.clientWidth - this.playButton.clientWidth) / 2;

        TweenMax.to(this.playButton, 0.5, {
            width: newSize,
            height: newSize,
            x: newX
        });
    }
}

module.exports = BottomBars;