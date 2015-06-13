'use strict';

var subclass = require('subclassjs');

var BoneAnimation = require('./BoneAnimation');
var NodeAnimationFactory = require('./NodeAnimationFactory');


var BoneAnimationFactory = subclass(function (pt) {

    pt.constructor = function (boneTree) {

        this.nodeAnimationFactory = new NodeAnimationFactory(boneTree);

    };

    /**
     * Creates a BoneAnimation from the give object.
     *
     * @param {Object} obj
     * @return {BoneAnimation}
     */
    pt.createFromObject = function (obj) {

        return new BoneAnimation(obj.name, this.nodeAnimationFactory.createFromObjectList(obj.nodes));

    };


    /**
     * Creates a list of BoneAnimations from the list of the object.
     *
     * @param {Array<Object>} objList
     * @return {Array<BoneAnimatin>}
     */
    pt.createFromObjectList = function (objList) {

        return objList.map(function (obj) {

            return this.createFromObject(obj);

        }, this);

    };

});

module.exports = BoneAnimationFactory;
