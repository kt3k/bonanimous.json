'use strict';

var subclass = require('subclassjs');


var NodeAnimation = subclass(function (pt) {

    pt.constructor = function (opts) {

        this.rotate = opts.r;
        this.scale = opts.s;
        this.translate = opts.t;
        this.repeat = opts.repeat;
        this.timing = opts.timing;
        this.direction = opts.dir;

    };

});

module.exports = NodeAnimation;
