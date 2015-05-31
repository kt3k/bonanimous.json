'use strict';

var subclass = require('subclassjs');

var Rotation = require('./Rotation');
var Scaling = require('./Scaling');
var Translation = require('./Translation');
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

        return this.create(keyframe, type, value0, value1);

    };

    /**
     * Creates a transform according to the params.
     */
    pt.create = function (keyframe, type, value0, value1) {

        if (type === 's') {

            return this.createScaling(keyframe, value0, value1);

        } else if (type === 't') {

            return this.createTranslation(keyframe, value0, value1);

        } else if (type === 'r') {

            return this.createRotation(keyframe, value0, value1);

        }
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

        return this.createTranslation(keyframe, 0, 0);

    };

    pt.createTranslation = function (keyframe, x, y) {

        return new Translation(keyframe, 't', x, y);

    };

    pt.createDefaultRotation = function (keyframe) {

        return this.createRotation(keyframe, 0);

    };

    pt.createRotation = function (keyframe, deg) {

        return new Rotation(keyframe, 'r', deg);

    };

    pt.createDefaultScaling = function (keyframe) {

        return this.createScaling(keyframe, 1, 1);

    }

    pt.createScaling = function (keyframe, x, y) {

        return new Scaling(keyframe, 's', x, y);

    };

});

module.exports = TransformFactory;
