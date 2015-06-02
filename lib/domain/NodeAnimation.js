'use strict';

var subclass = require('subclassjs');

var CombinedTransform = require('./CombinedTransform');


var NodeAnimation = subclass(function (pt) {

    pt.constructor = function (id, rotations, scalings, translations, duration, repeat, timing, direction) {

        this.id = id;
        this.rotations = rotations;
        this.scalings = scalings;
        this.translations = translations;
        this.duration = duration;
        this.repeat = repeat;
        this.timing = timing;
        this.direction = direction;

    };

    pt.keyframes = function () {

        var keyframes = [];

        keyframes = keyframes.concat(this.rotations.getKeyframes());
        keyframes = keyframes.concat(this.scalings.getKeyframes());
        keyframes = keyframes.concat(this.translations.getKeyframes());

        var result = {};

        keyframes.forEach(function (keyframe) {

            result[keyframe] = true;

        });

        return Object.keys(result).sort();

    };

    /**
     */
    pt.toCssString = function (name, boneTree) {

        var result = '';

        var tag = 'anim_' + name + '_' + this.id;

        var bone = boneTree.boneOfId(this.id);

        var position = boneTree.getAbsolutePosition(bone);

        result += '@keyframes ' + tag + ' {\n';

        result += this.keyframes().map(function (keyframe) {

            var rotation = this.rotations.getOrCreateAtKeyframe(keyframe);
            var scaling = this.scalings.getOrCreateAtKeyframe(keyframe);
            var translation = this.translations.getOrCreateAtKeyframe(keyframe);

            return '  ' + keyframe + '% ' + new CombinedTransform(position, rotation, scaling, translation).toCssString();

        }, this).join('\n');

        result += '\n}\n';

        result += '.' + name + ' #' + this.id + ' {\n';
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
