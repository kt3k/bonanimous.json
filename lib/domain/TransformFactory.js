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

        return new TransformCollection(transforms);

    };


    pt.createFromTypeAndTuple = function (type, tuple) {

        tuple = tuple || [];

        var keyframe = tuple[0];
        var value0 = tuple[1];
        var value1 = tuple[2];

        return new Transform(keyframe, type, value0, value1);

    };

});

module.exports = TransformFactory;
