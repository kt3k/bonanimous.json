'use strict';

var Bone = require('../../lib/domain/Bone');
var BoneFactory = require('../../lib/domain/BoneFactory');

var bone = require('../fixture/example.bone');



describe('BoneTree', function () {

    beforeEach(function () {

        this.boneTree = new BoneFactory().createTreeFromObjectList(bone);

    });

    describe('boneOfId', function () {

        it('retrieves the bone which has the given id', function () {

            var bone = this.boneTree.boneOfId('0');

            expect(bone).to.be.instanceof(Bone);
            expect(bone.id).to.equal('0');

        });

        it('returns undefined when the bone of the given id does not exist', function () {

            expect(this.boneTree.boneOfId('A')).to.be.undefined;

        });
    });

});
