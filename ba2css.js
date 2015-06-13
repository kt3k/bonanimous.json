'use strict';

var BoneFactory = require('./lib/domain/BoneFactory');
var BoneAnimationFactory = require('./lib/domain/BoneAnimationFactory');

var compile = function (bones, animations) {

    var boneTree = new BoneFactory().createTreeFromObjectList(bones);
    animations = new BoneAnimationFactory(boneTree).createFromObjectList(animations);

    return '\n' + animations.map(function (animation) {

        return animation.toCssString();

    }).join('\n');
};

module.exports = compile;
