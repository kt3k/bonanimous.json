

var BoneAnimationFactory = require('../../lib/domain/BoneAnimationFactory');
var BoneAnimation = require('../../lib/domain/BoneAnimation');

var boneAnimationList = require('../fixture/example.anim.json');



describe('BoneAnimation', function () {

    beforeEach(function () {

        this.factory = new BoneAnimationFactory();

    });

    describe('createFromObjectList', function () {

        it('creates a list of BoneAnimations from the list of the object', function () {

            var list = this.factory.createFromObjectList(boneAnimationList);

            list.forEach(function (boneAnimation) {

                expect(boneAnimation).to.be.instanceof(BoneAnimation);

            });

        });

    });

    describe('createFromObject', function () {

        it('creates a BoneAnimation from the object', function () {

            var boneAnimation = this.factory.createFromObject(boneAnimationList[0]);

            expect(boneAnimation).to.be.instanceof(BoneAnimation);

        });

    });

});
