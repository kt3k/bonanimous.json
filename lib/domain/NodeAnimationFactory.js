'use strict';

var subclass = require('subclassjs');

var NodeAnimation = require('./NodeAnimation');

var NodeAnimationFactory = subclass(function (pt) {

    /**
     * Creates a list of NodeAnimations from the list of objects.
     *
     * @param {Array<Object>} objList
     * @param {Array<NodeAnimation>}
     */
    pt.createFromObjectList = function (objList) {

        return objList.map(function (obj) {

            return new NodeAnimation(obj);

        });

    };

});

module.exports = NodeAnimationFactory;
