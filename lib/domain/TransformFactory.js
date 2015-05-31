'use strict';

var subclass = require('subclassjs');

var Transform = require('./Transform');
var TransformCollection = require('./TransformCollection');


var TransformFactory = subclass(function (pt) {

    pt.createFromTypeAndList = function (type, list) {

        list = list || [];

        var transforms = list.map(function (tuple) {

            return this.createFromTypeAndTuple(type, tuple);

        }, this);

        return new TransformCollection(type, transforms);

    };


    pt.createFromTypeAndTuple = function (type, tuple) {

        tuple = tuple || [];

        var keyframe = tuple[0];
        var value0 = tuple[1];
        var value1 = tuple[2];

        return new Transform(keyframe, type, value0, value1);

    };


    /**
     * Creates the default transform of the type and keyframe.
     */
    pt.defaultTransformOfType = function (type, keyframe) {

        if (type === 't') {

            return this.createDefaultTranslation(keyframe);

        } else if (type === 's') {

            return this.createDefaultScaling(keyframe);

        } else if (type === 'r') {

            return this.createDefaultRotation(keyframe);

        }
    };


    /**
     * Creates the default translation tranform of the given keyframe
     */
    pt.createDefaultTranslation = function (keyframe) {

        return new Transform(keyframe, 't', 0, 0);

    };

    pt.createDefaultRotation = function (keyframe) {

        return new Transform(keyframe, 'r', 0);

    };

    pt.createDefaultScaling = function (keyframe) {

        return new Transform(keyframe, 's', 1, 1);

    };

});

module.exports = TransformFactory;
