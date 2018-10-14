'use strict';

const EventEmitter = require('events');
const customEvents = require('../config/customEvents.js');
const eventsList = require('../config/eventsList.js');

class Bars extends EventEmitter {
    constructor(cssClass) {
        super();

        this.container = document.querySelector(`.${cssClass}`);
        this.container.style.backgroundColor = `rgba(1, 0, 109, 0.7)`; // default background

        this._addMouseListeners();
    }

    _addMouseListeners() {
        this.container.addEventListener(eventsList.mouseEvents.MOUSE_OVER, () => {
            this.emit(customEvents.bars.BARS_MOUSE_OVER);
        });
        this.container.addEventListener(eventsList.mouseEvents.MOUSE_OUT, () => {
            this.emit(customEvents.bars.BARS_MOUSE_OUT);
        });
    }
}

module.exports = Bars;