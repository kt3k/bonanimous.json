'use strict';

var BoneFactory = require('./lib/domain/BoneFactory');
var BoneAnimationFactory = require('./lib/domain/BoneAnimationFactory');

var compile = function (bones, animations) {

    animations = new BoneAnimationFactory().createFromObjectList(animations);
    var boneTree = new BoneFactory().createTreeFromObjectList(bones);

    return animations.map(function (animation) {

        return animation.toCssString(boneTree);

    }).join('\n');
};

module.exports = compile;
