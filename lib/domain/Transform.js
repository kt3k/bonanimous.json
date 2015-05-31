'use strict';

var subclass = require('subclassjs');

var Transform = subclass(function (pt) {

    pt.constructor = function (keyframe, type, value0, value1) {

        this.keyframe = keyframe;
        this.type = type;
        this.value0 = value0;
        this.value1 = value1;

        this.complementValue1();

    };

    pt.complementValue1 = function () {

        if (this.value1) {
            return;
        }

        if (this.type === 's') {
            // when scaling, default value of y scaling is the same as the x scaling
            this.value1 = this.value0;
        };

        if (this.type === 't') {
            // when translation, default value of y translation is 0
            this.value1 = 0;
        }

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
