'use strict';

var subclass = require('subclassjs');


var NodeAnimation = subclass(function (pt) {

    pt.constructor = function (rotates, scales, translates, repeat, timing, direction) {

        this.rotates = rotates;
        this.scales = scales;
        this.translates = translates;
        this.repeat = repeat;
        this.timing = timing;
        this.direction = direction;

    };

});

module.exports = NodeAnimation;
