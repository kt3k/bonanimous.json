'use strict';

var subclass = require('subclassjs');


var BoneAnimation = subclass(function (pt) {

    /**
     * @param {String} name The name of the animation
     * @param {NodeAnimationCollection} nodeAnimations
     */
    pt.constructor = function (name, nodeAnimations) {

        this.name = name;
        this.nodeAnimations = nodeAnimations;

    };

    /**
     * Gets the css expression of the bone animation.
     *
     * @return {String}
     */
    pt.toCssString = function () {
        return this.nodeAnimations.toCssString();
    };

});

module.exports = BoneAnimation;
