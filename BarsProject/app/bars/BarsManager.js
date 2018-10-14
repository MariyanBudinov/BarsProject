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
        this.addWindowListeners();
        this.resizeBarsContainer();
    }

    addTopBarsListeners() {
        let duration = 0.2,
            heightChange = 10;

        this.topBars.on(customEvents.bars.BARS_MOUSE_OVER, () => {
            TweenMax.to(this.topBars.container, duration, {
                height: '+=' + heightChange,
                ease: Power1.easeOut
            })
            TweenMax.to(this.bottomBars.container, duration, {
                height: '-=' + heightChange,
                ease: Power1.easeIn
            })
        });
        this.topBars.on(customEvents.bars.BARS_MOUSE_OUT, () => {
            TweenMax.to(this.topBars.container, duration, {
                height: '-=' + heightChange,
                ease: Power1.easeIn
            })
            TweenMax.to(this.bottomBars.container, duration, {
                height: '+=' + heightChange,
                ease: Power1.easeIn
            })
        });

        this.bottomBars.on(customEvents.bars.BARS_MOUSE_OVER, () => {
            TweenMax.to(this.bottomBars.container, duration, {
                height: '+=' + heightChange,
                ease: Power1.easeIn
            })
            TweenMax.to(this.topBars.container, duration, {
                height: '-=' + heightChange,
                ease: Power1.easeIn
            })
        });
        this.bottomBars.on(customEvents.bars.BARS_MOUSE_OUT, () => {
            TweenMax.to(this.bottomBars.container, duration, {
                height: '-=' + heightChange,
                ease: Power1.easeIn
            })
            TweenMax.to(this.topBars.container, duration, {
                height: '+=' + heightChange,
                ease: Power1.easeOut
            })
        });
    }

    addWindowListeners() {
        window.addEventListener("resize", this.resizeBarsContainer.bind(this));
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
    }
}

module.exports = BarsManager;