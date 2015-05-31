'use strict';

var subclass = require('subclassjs');


var TransformCollection = subclass(function (pt) {

    pt.constructor = function (transforms) {

        this.transforms = transforms;

    };

});

module.exports = TransformCollection;
