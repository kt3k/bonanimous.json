'use strict';

var subclass = require('subclassjs');

var NodeAnimationCollection = subclass(function (pt) {

    pt.constructor = function (nodeAnimations) {

        this.nodeAnimations = nodeAnimations;

    };


    pt.toCssString = function (name) {

        return this.nodeAnimations.map(function (animation) {

            return animation.toCssString(name);

        }).join('\n');

    };

});

module.exports = NodeAnimationCollection;
