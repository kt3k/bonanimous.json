'use strict';

var subclass = require('subclassjs');

var NodeAnimationCollection = subclass(function (pt) {

    /**
     * @param {Array<NodeAnimation>} nodeAnimations The array of the NodeAnimations
     */
    pt.constructor = function (nodeAnimations) {

        this.nodeAnimations = nodeAnimations;

    };


    /**
     * Gets the css expression of the animation collection
     *
     * @return {String}
     */
    pt.toCssString = function () {

        return this.nodeAnimations.map(function (animation) {

            return animation.toCssString();

        }).join('\n');

    };

});

module.exports = NodeAnimationCollection;
