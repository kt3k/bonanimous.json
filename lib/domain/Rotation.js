'use strict';


var subclass = require('subclassjs');

var Transform = require('./Transform');


var Rotation = subclass(Transform, function (pt) {

    pt.deg = function () {

        return this.value0;

    };

});

module.exports = Rotation;
