'use strict';

var subclass = require('subclassjs');


/**
 * Tree Structure of the bones.
 */
var BoneTree = subclass(function (pt) {

    /**
     * @param {Array<Bone>} bones the bones
     */
    pt.constructor = function (bones) {

        this.bones = bones;

        this.boneMap = {}

        this.bones.forEach(function (bone) {

            this.boneMap[bone.id] = bone;

        }, this);

    };

    /**
     * Gets the bones.
     *
     * @return {Array<Bone>}
     */
    pt.getBones = function () {

        return this.bones;

    };

    /**
     * Updates the absolute positions of the bones which belong to the tree.
     *
     * @private
     */
    pt.updateAbsolutePositions = function () {

        this.bones.forEach(function (bone) {

            bone.setAbsolutePosition(this.getAbsolutePosition(bone));

        }, this);

    };

    /**
     * Gets the bone of the given id.
     *
     * @param {String} id The id of the bone
     * @return {Bone}
     */
    pt.boneOfId = function (id) {

        return this.boneMap[id];

    };

    /**
     * Gets the parent bone.
     *
     * @param {Bone} bone
     * @return {Bone}
     */
    pt.getParent = function (bone) {

        return this.boneOfId(bone.parent);

    };

    /**
     * Gets all the parents of the bone.
     *
     * @param {Bone} bone
     * @return {Array<Bone>}
     */
    pt.getParents = function (bone) {

        var parents = [];

        var parent;

        while (parent = this.getParent(bone)) {

            parents.push(parent);

            bone = parent;

        }

        return parents;

    };

    /**
     * Gets the absolute position of the bone by calculation based on the tree structure.
     *
     * @param {Bone} bone
     * @return {Object}
     * @return {Number} .x
     * @return {Number} .y
     */
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
