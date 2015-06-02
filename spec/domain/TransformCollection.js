

var Transform = require('../../lib/domain/Transform');
var TransformFactory = require('../../lib/domain/TransformFactory');
var TransformCollection = require('../../lib/domain/TransformCollection');


describe('TransformCollection', function () {

    before(function () {

        this.transformFactory = new TransformFactory();

    });

    describe('constructor', function () {

        it('automatically supplies the start and end transform if none are given', function () {

            var transforms = new TransformCollection('s', []);

            expect(transforms.transformAtKeyframe(0)).to.be.instanceof(Transform);
            expect(transforms.transformAtKeyframe(100)).to.be.instanceof(Transform);

        });
    });

    describe('transformAtKeyframe', function () {

        it('returns the transform at the keyframe if exists', function () {

            var transforms = this.transformFactory.createFromTypeAndList('s', [[50, 0.5]]);

            expect(transforms.transformAtKeyframe(50)).to.be.instanceof(Transform);

        });

        it('returns undefined if it does not exist', function () {

            var transforms = this.transformFactory.createFromTypeAndList('s', [[50, 0.5]]);

            expect(transforms.transformAtKeyframe(40)).to.be.undefined;

        });

    });


    describe('add', function () {

        it('adds the transform to the collection', function () {

            var transforms = this.transformFactory.createFromTypeAndList('s', []);

            transforms.add(this.transformFactory.createFromTypeAndTuple('s', [40, 0.8, 0.7]));

            expect(transforms.transformAtKeyframe(40)).to.be.instanceof(Transform);
            expect(transforms.transformAtKeyframe(40).value0).to.equal(0.8);
            expect(transforms.transformAtKeyframe(40).value1).to.equal(0.7);

        });

    });


    describe('getOrCreateAtKeyframe', function () {

        it('gets the transform if the transform at the exact keyframe exists', function () {

            var transforms = this.transformFactory.createFromTypeAndList('s', []);

            var transform = this.transformFactory.createFromTypeAndTuple('s', [40, 0.8, 0.7]);

            transforms.add(transform);

            expect(transforms.getOrCreateAtKeyframe(40)).to.equal(transform);

        });

        it('creates a transform according to the transforms next to the given keyframe', function () {

            var transforms = this.transformFactory.createFromTypeAndList('s', [[0, 100, 1], [100, 200, 0]]);

            var transform = transforms.getOrCreateAtKeyframe(50);

            expect(transform).to.be.instanceof(Transform);
            expect(transform.value0).to.equal(150);
            expect(transform.value1).to.equal(0.5);

        });
    });

});
