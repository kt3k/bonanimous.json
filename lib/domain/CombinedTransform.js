'use strict';

var subclass = require('subclassjs');

var CombinedTransform = subclass(function (pt) {

    pt.constructor = function (position, rotation, scaling, translation) {

        this.position = position;
        this.rotation = rotation;
        this.scaling = scaling;
        this.translation = translation;

    };

    pt.toCssString = function () {

        var result = '';

        var rad = Math.PI * 2 * this.rotation.deg() / 360;

        var sin = Math.sin(rad);
        var cos = Math.cos(rad);

        var sx = this.scaling.x();
        var sy = this.scaling.y();

        var tx = this.translation.x();
        var ty = -this.translation.y();

        var tx0 = (sx * tx * cos - sy * ty * sin) / (sx * sy);
        var ty0 = (-sy * tx * sin - sx * ty * cos) / (sx * sy);

        // I don't understand the above horrible formulas at all.
        // Fix them later, maybe using some reasonable liear algebraic library

        var x = this.position.x;
        var y = this.position.y;

        result += '{ transform:';
        result += ' translate(' + x + 'px,' + y + 'px)';
        result += ' scale(' + this.scaling.x() + ',' + this.scaling.y() + ')';
        result += ' rotate(' + this.rotation.deg() + 'deg)';
        result += ' translate(' + (tx0 - x) + 'px,' + (ty0 - y) + 'px)';
        result += ' }';

        return result;

    };

});

module.exports = CombinedTransform;
