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

        this.keyframes = this.transforms.map(function (transform) {

            return transform.keyframe;

        }).sort();

        var TransformFactory = require('./TransformFactory');
        this.transformFactory = new TransformFactory();

        this.complementStartAndEnd();

    };


    /**
     * Supples start transform and end transform if there wasn't.
     *
     * @private
     */
    pt.complementStartAndEnd = function () {

        var start = this.keyframeToTransform[0];
        var end = this.keyframeToTransform[100];

        if (!start) {

            start = this.transformFactory.defaultTransformOfType(this.type, 0);

            this.add(start);

        }

        if (!end) {

            end = this.transformFactory.defaultTransformOfType(this.type, 100);

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

        this.keyframes = this.transforms.map(function (transform) {

            return transform.keyframe;

        }).sort();

    };


    pt.transformAtKeyframe = function (keyframe) {

        return this.keyframeToTransform[keyframe];

    };


    pt.getOrCreateAtKeyframe = function (keyframe) {

        var transform = this.keyframeToTransform[keyframe];

        if (transform) {

            return transform;

        }

        var low = this.highestKeyframeBelow(keyframe);
        var high = this.lowestKeyframeAbove(keyframe);

        var ratio = (keyframe - low) / (high - low);

        var lowTransform = this.transformAtKeyframe(low);
        var highTransform = this.transformAtKeyframe(high);


        var value0 = (highTransform.value0 - lowTransform.value0) * ratio + lowTransform.value0;
        var value1 = (highTransform.value1 - lowTransform.value1) * ratio + lowTransform.value1;

        return this.transformFactory.createFromTypeAndTuple(this.type, [keyframe, value0, value1]);

    };


    /**
     * Returns the highest keyframe below the given keyframe.
     *
     * @private
     */
    pt.highestKeyframeBelow = function (keyframe) {

        var keyframes = this.keyframes.filter(function (kf) {

            return kf < keyframe;

        });

        if (keyframes.length === 0) {

            return 0;

        }

        return keyframes[keyframes.length - 1];

    };


    /**
     * Returns the lowest keyframe above the given keyframe
     *
     * @private
     * @param {Number} keyframe
     */
    pt.lowestKeyframeAbove = function (keyframe) {

        var keyframes = this.keyframes.filter(function (kf) {

            return kf > keyframe;

        });

        if (keyframes.length === 0) {

            return 100;

        }

        return keyframes[0];

    };


    pt.getKeyframes = function () {

        return this.keyframes;

    };

});



module.exports = TransformCollection;
