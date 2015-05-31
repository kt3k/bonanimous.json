'use strict';

var BoneFactory = require('../../lib/domain/BoneFactory');
var Bone = require('../../lib/domain/Bone');

var boneList = require('../fixture/example.bone');


describe('BoneFactory', function () {

    beforeEach(function () {

        this.factory = new BoneFactory();

    });

    describe('createFromObjectList', function () {

        it('creates a list of bones from the list of the objects', function () {

            var bones = this.factory.createFromObjectList(boneList);

            expect(bones).to.be.an('array');
            expect(bones).to.have.length(3);

            bones.forEach(function (bone) {

                expect(bone).to.be.instanceof(Bone);

            });

        });

    });

    describe('createFromObject', function () {

        it('creates a bone from the object', function () {

            var bone = this.factory.createFromObject(boneList[0]);

            expect(bone).to.be.instanceof(Bone);

        });

    });

});
