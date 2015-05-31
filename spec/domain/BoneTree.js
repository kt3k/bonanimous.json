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

    describe('getParent', function () {

        it('gets the parent', function () {

            var bone = this.boneTree.boneOfId('0-0-0');

            var parent = this.boneTree.getParent(bone);

            expect(parent).to.be.instanceof(Bone);
            expect(parent.id).to.equal('0-0');

        });

    });

    describe('getParents', function () {

        it('gets the list of the parents', function () {

            var bone = this.boneTree.boneOfId('0-0-0');

            var parents = this.boneTree.getParents(bone);

            expect(parents).to.be.an('array');

            expect(parents[0]).to.be.instanceof(Bone);
            expect(parents[0].id).to.equal('0-0');
            expect(parents[1]).to.be.instanceof(Bone);
            expect(parents[1].id).to.equal('0');

        });

    });

});
