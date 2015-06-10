#!/usr/bin/env node


var fs = require('fs');
var ba2css = require('./ba2css');
var svg2js = require('svgo/lib/svgo/svg2js');
var js2svg = require('svgo/lib/svgo/js2svg');
var SvgNode = require('svgo/lib/svgo/jsAPI');

var argv = require('minimist')(process.argv.slice(2));


var createStyleElement = function (cssBody, parent) {
    var styleElement = new SvgNode({elem: "style", content: []}, parent);

    var cssTextNode = new SvgNode({text: cssBody}, styleElement);

    styleElement.content.push(cssTextNode);

    return styleElement;
};

var main = function (argv) {

    var source = argv.source;
    var bone = argv.bone;
    var anim = argv.anim;
    var output = argv.output;

    console.log('[source] ' + source);
    console.log('[bone]   ' + bone);
    console.log('[anim]   ' + anim);
    console.log('[output] ' + output);

    if (!source) {
        throw new Error('source not specified: ' + source);
    }

    if (!bone) {
        throw new Error('bone not specified: ' + bone);
    }

    if (!anim) {
        throw new Error('anim not specified: ' + anim);
    }

    if (!output) {
        throw new Error('output not specified: ' + output);
    }

    var sourceSvg = fs.readFileSync(source).toString();

    try {
        bone = JSON.parse(fs.readFileSync(bone));
    } catch (e) {
        throw new Error('bone file is broken');
    }

    try {
        anim = JSON.parse(fs.readFileSync(anim));
    } catch (e) {
        throw new Error('anim file is broken');
    }

    console.log('All arguments look well');
    console.log('Generating output file');

    var outCss = ba2css(bone, anim);

    svg2js(sourceSvg, function (svgTree) {

        svgTree.content[0].content.push(createStyleElement(outCss));

        var outputSvg = js2svg(svgTree, {pretty: true});

        fs.writeFileSync(output, outputSvg.data);

    });

};

main(argv);
