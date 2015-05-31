'use strict';

var subclass = require('subclassjs');


var NodeAnimation = subclass(function (pt) {

    pt.constructor = function (id, rotates, scales, translates, repeat, timing, direction) {

        this.id = id;
        this.rotates = rotates;
        this.scales = scales;
        this.translates = translates;
        this.repeat = repeat;
        this.timing = timing;
        this.direction = direction;

    };

    pt.keyframes = function () {

        var keyframes = [];

        keyframes = keyframes.concat(this.rotates.keyframes());
        keyframes = keyframes.concat(this.scales.keyframes());
        keyframes = keyframes.concat(this.translates.keyframes());

        result = {};

        keyframes.forEach(function (keyframe) {

            result[keyframe] = true;

        });

        return Object.keys(result).sort();

    };

    pt.toCssString = function (name) {

        var result = '';

        var tag = this.id + '_' + name;

        result += '@keyframes ' + tag + ' {\n';
        result += '}\n';

        result += '.' + tag + ' {\n';
        result += '  animation-name: ' + tag + '\n';
        result += '  animation-count: ' + this.repeat + '\n';
        result += '  animation-timing-function: ' + this.timing + '\n';
        result += '  animation-direction: ' + this.direction + '\n';
        result += '}\n';

        return result;

    };

});

module.exports = NodeAnimation;
