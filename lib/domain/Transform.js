'use strict';

var subclass = require('subclassjs');

var Transform = subclass(function (pt) {

    pt.constructor = function (keyframe, type, value0, value1) {

        this.keyframe = keyframe;
        this.type = type;
        this.value0 = value0;
        this.value1 = value1 || value0;

    };

    pt.toString = function () {

        if (this.type === 'r') {

            return 'rotate(' + this.value0 + 'deg)';

        } else if (this.type === 's') {

            return 'scale(' + this.value0 + ',' + this.value1 + ')';

        } else if (this.type === 't') {

            return 'translate(' + this.value0 + ',' + this.value1 + ')';

        } else {

            return 'translate(0)';

        }

    };

});

module.exports = Transform;
