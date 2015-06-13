

NodeAnimationFactory = require('../../lib/domain/NodeAnimationFactory');

var BoneFactory = require('../../lib/domain/BoneFactory');
boneFactory = new BoneFactory();

var bone = require('../fixture/example.bone');

factory = new NodeAnimationFactory(boneFactory.createTreeFromObjectList(bone));



describe('NodeAnimation', function () {

    describe('keyframes', function () {

        it('returns list of keyframes, which means the union of the all keyframes of scaling, rotation and translation', function () {

            var nodeAnim = factory.createFromNameAndObject('some-animation', {
                id: '0-0',
                s: [[15, 1.2], [35, 1.3]],
                r: [[40, 10], [41, 20], [42, 30]],
                t: [[81, 10, 0], [91, 0, 10]]
            });

            expect(nodeAnim.keyframes()).to.eql([0, 15, 35, 40, 41, 42, 81, 91, 100])

        });

    });

    describe('toCssString', function () {

        it('returns css representation of the node animation', function () {

            var nodeAnim = factory.createFromNameAndObject('some-animation', {
                id: '0-0',
                s: [[15, 1.2], [35, 1.3]],
                duration: 2000
            });

            var css = nodeAnim.toCssString();

            var expected = '';

            expected += '@keyframes anim_some-animation_0-0 {\n';
            expected += '  0% { transform: translate(60px,60px) scale(1,1) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '  15% { transform: translate(60px,60px) scale(1.2,1.2) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '  35% { transform: translate(60px,60px) scale(1.3,1.3) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '  100% { transform: translate(60px,60px) scale(1,1) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '}\n';
            expected += '.some-animation #0-0 {\n';
            expected += '  animation-name: anim_some-animation_0-0;\n';
            expected += '  animation-iteration-count: undefined;\n';
            expected += '  animation-duration: 2000ms;\n';
            expected += '  animation-timing-function: undefined;\n';
            expected += '  animation-direction: undefined;\n';
            expected += '}\n';

            expect(css).to.equal(expected);

        });

        it('omits class name in the css selector when the name is `default`', function () {

            var nodeAnim = factory.createFromNameAndObject('default', {
                id: '0-0',
                s: [[15, 1.2], [35, 1.3]],
                duration: 2000
            });

            var css = nodeAnim.toCssString();

            var expected = '';

            expected += '@keyframes anim_default_0-0 {\n';
            expected += '  0% { transform: translate(60px,60px) scale(1,1) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '  15% { transform: translate(60px,60px) scale(1.2,1.2) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '  35% { transform: translate(60px,60px) scale(1.3,1.3) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '  100% { transform: translate(60px,60px) scale(1,1) rotate(0deg) translate(-60px,-60px) }\n';
            expected += '}\n';
            expected += '#0-0 {\n';
            expected += '  animation-name: anim_default_0-0;\n';
            expected += '  animation-iteration-count: undefined;\n';
            expected += '  animation-duration: 2000ms;\n';
            expected += '  animation-timing-function: undefined;\n';
            expected += '  animation-direction: undefined;\n';
            expected += '}\n';

            expect(css).to.equal(expected);

        });

    });

});
