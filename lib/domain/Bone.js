'use strict';

var subclass = require('subclassjs');

var Bone = subclass(function (pt) {

    pt.constructor = function (opts) {

        this.id = opts.id;
        this.x = opts.x;
        this.y = opts.y;
        this.parent = opts.parent;
        this.absolutePosition = null;

    };

    /**
     * Sets the absolute position of the bone.
     *
     * @param {Object} position
     * @param {Number} position.x
     * @param {Number} position.y
     */
    pt.setAbsolutePosition = function (position) {

        this.absolutePosition = position;

    };

    /**
     * Gets the absolute position of the bone. It need to be set before this called.
     *
     * @return {Object}
     * @return {Number} .x
     * @return {Number} .y
     */
    pt.getAbsolutePosition = function () {

        return this.absolutePosition;

    };

});

module.exports = Bone;
