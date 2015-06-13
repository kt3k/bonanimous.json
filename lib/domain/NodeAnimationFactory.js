'use strict';

var subclass = require('subclassjs');

var NodeAnimation = require('./NodeAnimation');
var NodeAnimationCollection = require('./NodeAnimationCollection');
var TransformFactory = require('./TransformFactory');

var NodeAnimationFactory = subclass(function (pt) {

    /**
     * @param {BoneTree} boneTree
     */
    pt.constructor = function (boneTree) {

        this.boneTree = boneTree;

        this.transformFactory = new TransformFactory();

    };

    /**
     * Creates a list of NodeAnimations from the list of objects.
     *
     * @param {String} name The name of the animation
     * @param {Array<Object>} objList
     * @param {Array<NodeAnimation>}
     */
    pt.createFromNameAndObjectList = function (name, objList) {

        objList = objList || [];

        var nodeAnimations = objList.map(function (obj) {

            return this.createFromNameAndObject(name, obj);

        }, this);

        return new NodeAnimationCollection(nodeAnimations);

    };


    /**
     * Creates a NodeAnimation from the object.
     *
     * @param {String} name The name of the animation
     * @param {Object} obj
     * @param {String} obj.id
     * @param {Array} obj.s
     * @param {Array} obj.r
     * @param {Array} obj.t
     * @return {NodeAnimation}
     */
    pt.createFromNameAndObject = function (name, obj) {

        var bone = this.boneTree.boneOfId(obj.id);
        var position = this.boneTree.getAbsolutePosition(bone);

        var rotates = this.transformFactory.createFromTypeAndList('r', obj.r);
        var scales = this.transformFactory.createFromTypeAndList('s', obj.s);
        var translates = this.transformFactory.createFromTypeAndList('t', obj.t);

        return new NodeAnimation(obj.id, name, rotates, scales, translates, obj.duration, obj.repeat, obj.timing, obj.dir, position);

    };

});

module.exports = NodeAnimationFactory;
