'use strict';

var subclass = require('subclassjs');


var BoneAnimation = subclass(function (pt) {

    pt.constructor = function (name, nodeAnimations) {

        this.name = name;
        this.nodeAnimations = nodeAnimations;

    };

    pt.toCssString = function (boneTree) {
        return this.nodeAnimations.toCssString(this.name, boneTree);
    };

});

module.exports = BoneAnimation;
