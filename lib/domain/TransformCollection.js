'use strict';

var subclass = require('subclassjs');



var TransformCollection = subclass(function (pt) {


    pt.constructor = function (type, transforms) {

        this.type = type;
        this.transforms = transforms;

        this.keyframeToTransform = {};

        this.transforms.forEach(function (transform) {

            this.keyframeToTransform[transform.keyframe] = transform;

        }, this);

        var TransformFactory = require('./TransformFactory');
        this.tranformFactory = new TransformFactory();

        this.complementStartAndEnd();

    };


    pt.complementStartAndEnd = function () {

        var start = this.keyframeToTransform[0];
        var end = this.keyframeToTransform[100];

        if (!start) {

            start = this.tranformFactory.defaultTransformOfType(this.type, 0);

            this.add(start);

        }

        if (!end) {

            end = this.tranformFactory.defaultTransformOfType(this.type, 100);

            this.add(end);

        }

    };


    /**
     * Add a new transform into the collection.
     *
     * @param {Transform} transform
     */
    pt.add = function (transform) {

        this.transforms.push(transform);
        this.keyframeToTransform[transform.keyframe] = transform;

    };


    pt.transformAtKeyframe = function (keyframe) {

        return this.keyframeToTransform[keyframe];

    };

});



module.exports = TransformCollection;
