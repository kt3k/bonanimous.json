'use strict';

var subclass = require('subclassjs');

var NodeAnimationCollection = subclass(function (pt) {

    pt.constructor = function (nodeAnimations) {

        this.nodeAnimations = nodeAnimations;

    };

});

module.exports = NodeAnimationCollection;
