'use strict';

const BarsManager = require('./bars/BarsManager.js');
const customEvents = require('./bars/config/customEvents.js');

document.addEventListener('DOMContentLoaded', () => {
    let barsManager = new BarsManager();

    barsManager.on(customEvents.barsManager.BARS_MANAGER_PLAY_BUTTON_CLICK, (e) => {
        console.log('LAUNCHER PLAY / e', e)
    });

    barsManager.on(customEvents.barsManager.BARS_MANAGER_TOP_BUTTON_CLICK, (e) => {
        console.log('LAUNCHER / e', e)
    });
});