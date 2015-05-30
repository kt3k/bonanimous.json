'use strict';

var subclass = require('subclassjs');

var Bone = subclass(function (pt) {

    pt.constructor = function (opts) {

        this.id = opts.id;
        this.x = opts.x;
        this.y = opts.y;

    };

});

module.exports = Bone;
