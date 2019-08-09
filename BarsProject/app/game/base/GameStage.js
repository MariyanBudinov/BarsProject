'use strict';

const EventEmitter = require('events');

class GameStage extends EventEmitter {
    constructor(PIXI, cssClass) {
        super();

        this.container = document.querySelector(`.${cssClass}`);

        this.init(PIXI);
    }

    init(PIXI) {
        let type = "WebGL";

        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        }

        PIXI.utils.sayHello(type);
    }
}

module.exports = GameStage;