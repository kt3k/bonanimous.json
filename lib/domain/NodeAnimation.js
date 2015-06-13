'use strict';

var subclass = require('subclassjs');

var CombinedTransform = require('./CombinedTransform');


var NodeAnimation = subclass(function (pt) {

    /**
     * @param {String} id The id of the bone
     * @param {String} name The name of the animation
     * @param {TransformCollection<Rotation>} rotation The collection of the rotations
     * @param {TransformCollection<Scaling>} scalings The collection of the scalings
     * @param {TransformCollection<Translation>} translations The collection of the translations
     * @param {Number} duration The duration of the animation
     * @param {String} repeat The repetition (css expression)
     * @param {String} timing The timing function name, such as liner or ease (css animation-timing-function value)
     * @param {direction} direction The direction of the animation, such as alternate or reverse (css animation-direction values)
     * @param {Object} position The position of the origin of the animation
     * @param {Number} position.x The x of the position
     * @param {Number} position.y The y of the position
     */
    pt.constructor = function (id, name, rotations, scalings, translations, duration, repeat, timing, direction, position) {

        this.id = id; // the id of the bone
        this.name = name; // the name of the animation
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
    pt.toCssString = function () {

        var tag = 'anim_' + this.name + '_' + this.id;

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

        result += '.' + this.name + ' ';
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
