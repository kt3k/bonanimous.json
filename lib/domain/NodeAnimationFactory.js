'use strict';

var subclass = require('subclassjs');

var NodeAnimation = require('./NodeAnimation');
var NodeAnimationCollection = require('./NodeAnimationCollection');
var TransformFactory = require('./TransformFactory');

var NodeAnimationFactory = subclass(function (pt) {

    pt.constructor = function () {

        this.transformFactory = new TransformFactory();

    };

    /**
     * Creates a list of NodeAnimations from the list of objects.
     *
     * @param {Array<Object>} objList
     * @param {Array<NodeAnimation>}
     */
    pt.createFromObjectList = function (objList) {

        objList = objList || [];

        var nodeAnimations = objList.map(function (obj) {

            return this.createFromObject(obj);

        }, this);

        return new NodeAnimationCollection(nodeAnimations);

    };


    pt.createFromObject = function (obj) {

        var rotates = this.transformFactory.createFromTypeAndList('r', obj.r);
        var scales = this.transformFactory.createFromTypeAndList('s', obj.s);
        var translates = this.transformFactory.createFromTypeAndList('t', obj.t);

        return new NodeAnimation(obj.id, rotates, scales, translates, obj.duration, obj.repeat, obj.timing, obj.dir);

    };

});

module.exports = NodeAnimationFactory;
