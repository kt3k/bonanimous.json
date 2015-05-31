

var TransformCollection = require('../../lib/domain/TransformCollection');
var Transform = require('../../lib/domain/Transform');


describe('TransformCollection', function () {

    describe('constructor', function () {

        it('automatically supplies the start and end transform if none are given', function () {

            var transforms = new TransformCollection('s', []);

            expect(transforms.transformAtKeyframe(0)).to.be.instanceof(Transform);
            expect(transforms.transformAtKeyframe(100)).to.be.instanceof(Transform);

        });
    });

});
