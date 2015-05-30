'use strict';

var subclass = require('subclassjs');


var BoneAnimation = subclass(function (pt) {

    pt.constructor = function (name, nodeAnimations) {

        this.name = name;
        this.nodeAnimations = nodeAnimations;

    };

});

module.exports = BoneAnimation;
