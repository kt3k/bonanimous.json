'use strict';

var subclass = require('subclassjs');


var BoneTree = subclass(function (pt) {

    pt.constructor = function (bones) {

        this.bones = bones;

        this.boneMap = {}

        this.bones.forEach(function (bone) {

            this.boneMap[bone.id] = bone;

        }, this);

    };

    pt.boneOfId = function (id) {

        return this.boneMap[id];

    };

    pt.getParent = function (bone) {

        return this.boneOfId(bone.parent);

    };

    pt.getParents = function (bone) {

        var parents = [];

        var parent;

        while (parent = this.getParent(bone)) {

            parents.push(parent);

            bone = parent;

        }

        return parents;

    };

    pt.getAbsolutePosition = function (bone) {

        var parents = this.getParents(bone);

        var x = sum(parents.map(function (bone) { return bone.x; }));
        var y = sum(parents.map(function (bone) { return bone.y; }));

        return {
            x: x + bone.x,
            y: y + bone.y
        };

    };

    var sum = function (array) {

        return array.reduce(function (x, y) { return x + y; }, 0);

    };

});

module.exports = BoneTree;
