'use strict';

const EventEmitter = require('events');
const { TweenMax, TweenLite, Bounce, Power1 } = require('gsap');

const TopBars = require('./custom/TopBars.js');
const BottomBars = require('./custom/BottomBars.js');
const customEvents = require('./config/customEvents.js');
const eventsList = require('./config/eventsList.js');

class BarsManager extends EventEmitter {
    constructor() {
        super();

        this.container = document.querySelector('.bars-container');
        this.topBars = new TopBars('top-bars');
        this.bottomBars = new BottomBars('bottom-bars');

        this.addTopBarsListeners();
        this.addBottomBarsListeners();
        this.addWindowListeners();
        this.resizeBarsContainer();
    }

    // TOP BARS LISTENERS
    addTopBarsListeners() {
        this.topBars.on(customEvents.bars.TOP_BARS_BUTTON_CLICK, (e) => {
            this.emit(customEvents.barsManager.BARS_MANAGER_TOP_BUTTON_CLICK, {
                button: e.button,
                class: e.class
            });
        });
    }

    // BOTTOM BARS LISTENERS
    addBottomBarsListeners() {
        this.bottomBars.on(customEvents.bars.BOTTOM_BARS_PLAY_BUTTON_CLICK, (e) => {
            this.emit(customEvents.barsManager.BARS_MANAGER_PLAY_BUTTON_CLICK, {
                button: e.button,
                class: e.class
            });
        });
    }

    // WINDOW LISTENERS
    addWindowListeners() {
        window.addEventListener(eventsList.windowEvents.RESIZE, this.resizeBarsContainer.bind(this));
    }

    resizeBarsContainer() {
        let widthCorrection = 25,
            heightCorrection = 30;

        this.container.style.width = document.documentElement.clientWidth ?
            `${document.documentElement.clientWidth - widthCorrection}px` :
            `${window.innerWidth - widthCorrection}px`;
        this.container.style.height = document.documentElement.clientHeight ?
            `${document.documentElement.clientHeight - heightCorrection}px` :
            `${window.innerHeight - heightCorrection}px`;

        this.topBars.resizeButtons();
        this.bottomBars.resizeButtons();
    }
}

module.exports = BarsManager;