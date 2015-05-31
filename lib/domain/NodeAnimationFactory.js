'use strict';

var subclass = require('subclassjs');

var NodeAnimation = require('./NodeAnimation');
var NodeAnimationCollection = require('./NodeAnimationCollection');

var NodeAnimationFactory = subclass(function (pt) {

    /**
     * Creates a list of NodeAnimations from the list of objects.
     *
     * @param {Array<Object>} objList
     * @param {Array<NodeAnimation>}
     */
    pt.createFromObjectList = function (objList) {

        objList = objList || [];

        var nodeAnimations = objList.map(function (obj) {

            return new NodeAnimation(obj);

        });

        return new NodeAnimationCollection(nodeAnimations);

    };

});

module.exports = NodeAnimationFactory;
