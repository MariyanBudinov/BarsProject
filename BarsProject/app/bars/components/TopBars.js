'use strict';

const EventEmitter = require('events');

class TopBar extends EventEmitter {

    constructor() {
        super();

        this.container = document.querySelector('.top-bars');
        this.events = {
            TOP_BARS_MOUSE_OVER: 'TOP_BARS_MOUSE_OVER',
            TOP_BARS_MOUSE_OUT: 'TOP_BARS_MOUSE_OUT'
        };
        this.domEvents = {
            MOUSE_OVER: 'mouseover',
            MOUSE_OUT: 'mouseout'
        };

        this.addMouseListeners();
    }

    addMouseListeners() {
        this.container.addEventListener(this.domEvents.MOUSE_OVER, () => {
            this.emit(this.events.TOP_BARS_MOUSE_OVER);
        });
        this.container.addEventListener(this.domEvents.MOUSE_OUT, () => {
            this.emit(this.events.TOP_BARS_MOUSE_OUT);
        });
    }
}

module.exports = TopBar;