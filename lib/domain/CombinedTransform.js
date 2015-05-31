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

        var x = this.position.x + this.tranlsation.x();
        var y = this.position.y + this.tranlsation.y();

        result += '{ transform:';
        result += ' tranlsate(' + x + 'px,' + y + 'px)';
        result += ' scale(' + this.scaling.x() + ',' + this.scaling.y() + ')';
        result += ' rotate(' + this.rotation.deg() + 'deg)';
        result += ' translate(' + (-x) + 'px,' + (-y) + 'px)';
        result += '}';

        return result;

    };

});

module.exports = CombinedTransform;
