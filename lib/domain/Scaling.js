'use strict';

var subclass = require('subclassjs');

var Transform = require('./Transform');

var Scaling = subclass(Transform, function (pt) {

    pt.x = function () {

        return this.value0;

    };

    pt.y = function () {

        return this.value1;

    };
});

module.exports = Scaling;
