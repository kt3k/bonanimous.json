

var BoneAnimationFactory = require('../../lib/domain/BoneAnimationFactory');
var BoneAnimation = require('../../lib/domain/BoneAnimation');
var BoneFactory = require('../../lib/domain/BoneFactory');

var boneAnimationList = require('../fixture/example.anim');
var bone = require('../fixture/example.bone');



describe('BoneAnimation', function () {

    beforeEach(function () {

        var boneTree = new BoneFactory().createTreeFromObjectList(bone);

        this.factory = new BoneAnimationFactory(boneTree);

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
