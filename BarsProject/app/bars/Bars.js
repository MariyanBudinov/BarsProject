'use strict';

const TopBar = require('./components/TopBars.js');

class Bars {
    constructor() {
        this.container = document.querySelector('.bars-container');
        this.topBar = new TopBar();
        this.addWindowListeners();
        this.resizeBarsContainer();
        this.addTopBarsListeners();
    }

    addTopBarsListeners() {
        this.topBar.on(this.topBar.events.TOP_BARS_MOUSE_OVER, () => {
            console.log('COLOR CHANGE');
            this.topBar.container.style.backgroundColor = `rgb(0, ${Math.round(Math.random() * 255)}, 255)`;
        });
        this.topBar.on(this.topBar.events.TOP_BARS_MOUSE_OUT, () => {
            console.log('COLOR CHANGE');
            this.topBar.container.style.backgroundColor = `rgb(
                ${Math.round(Math.random() * 255)},
                 ${Math.round(Math.random() * 255)},
                  ${Math.round(Math.random() * 255)}
            )`;
        });
    }

    addWindowListeners() {
        window.addEventListener("resize", this.resizeBarsContainer.bind(this));
    }

    resizeBarsContainer() {
        let widthCorrection = 25,
            heightCorrection = 30;

        this.container.style.width = document.documentElement.clientWidth ?
            `${document.documentElement.clientWidth - widthCorrection}px` : `${window.innerWidth - widthCorrection}px`;
        this.container.style.height = document.documentElement.clientHeight ?
            `${document.documentElement.clientHeight - heightCorrection}px` : `${window.innerHeight - heightCorrection}px`;
        this.container.style.border = `rgb(0, ${Math.round(Math.random() * 255)}, 255) solid 5px`;
        this.container.style.padding = `0px`;
        this.container.style.margin = `0px`;
    }
}

module.exports = Bars;