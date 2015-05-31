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

        return pt.boneOfId(bone.parent);

    };

    pt.getParents = function (bone) {

        var parents = [];

        var parent;

        while (parent = this.getParent(bone)) {

            parents.push(parent);

        }

        return parents;

    };

});

module.exports = BoneTree;
