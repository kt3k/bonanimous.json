'use strict';

var BoneFactory = require('./lib/domain/BoneFactory');
var BoneAnimationFactory = require('./lib/domain/BoneAnimationFactory');

var compile = function (bones, animations) {

    var boneTree = new BoneFactory().createTreeFromObjectList(bones);
    animations = new BoneAnimationFactory(boneTree).createFromObjectList(animations);

    return animations.map(function (animation) {

        return animation.toCssString(boneTree);

    }).join('\n');
};

module.exports = compile;
