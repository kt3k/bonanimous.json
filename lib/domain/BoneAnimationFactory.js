'use strict';

var subclass = require('subclassjs');

var BoneAnimation = require('./BoneAnimation');
var NodeAnimationFactory = require('./NodeAnimationFactory');


var BoneAnimationFactory = subclass(function (pt) {

    /**
     * Creates a BoneAnimation from the give object.
     *
     * @param {Object} obj
     * @return {BoneAnimation}
     */
    pt.createFromObject = function (obj) {

        return new BoneAnimation(obj.name, new NodeAnimationFactory().createFromObjectList(obj.nodes));

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
