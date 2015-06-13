'use strict';

var subclass = require('subclassjs');

var CombinedTransform = require('./CombinedTransform');


var NodeAnimation = subclass(function (pt) {

    pt.constructor = function (id, rotations, scalings, translations, duration, repeat, timing, direction, position) {

        this.id = id;
        this.rotations = rotations;
        this.scalings = scalings;
        this.translations = translations;
        this.duration = duration;
        this.repeat = repeat;
        this.timing = timing;
        this.direction = direction;
        this.position = position;

    };

    pt.keyframes = function () {

        var keyframes = [];

        keyframes = keyframes.concat(this.rotations.getKeyframes());
        keyframes = keyframes.concat(this.scalings.getKeyframes());
        keyframes = keyframes.concat(this.translations.getKeyframes());

        return keyframes.filter(function (keyframe, index) {

            return keyframes.indexOf(keyframe) == index;

        }).sort(function (x, y) { return x - y; });

    };

    /**
     * Returns the css representation of the animation.
     *
     * @param {String} name The name of the animation
     */
    pt.toCssString = function (name) {

        var tag = 'anim_' + name + '_' + this.id;

        var position = this.position;

        var result = '';

        result += '@keyframes ' + tag + ' {\n';

        result += this.keyframes().map(function (keyframe) {

            var rotation = this.rotations.getOrCreateAtKeyframe(keyframe);
            var scaling = this.scalings.getOrCreateAtKeyframe(keyframe);
            var translation = this.translations.getOrCreateAtKeyframe(keyframe);

            return '  ' + keyframe + '% ' + new CombinedTransform(position, rotation, scaling, translation).toCssString();

        }, this).join('\n');

        result += '\n}\n';

        result += '.' + name + ' ';
        result += '#' + this.id + ' {\n';
        result += '  animation-name: ' + tag + ';\n';
        result += '  animation-iteration-count: ' + this.repeat + ';\n';
        result += '  animation-duration: ' + this.duration + 'ms;\n';
        result += '  animation-timing-function: ' + this.timing + ';\n';
        result += '  animation-direction: ' + this.direction + ';\n';
        result += '}\n';

        return result;

    };

});

module.exports = NodeAnimation;
