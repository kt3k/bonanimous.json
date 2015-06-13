#!/usr/bin/env node


var fs = require('fs');
var chalk = require('chalk');

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
        console.log(chalk.red('source not specified: ' + source));
        process.exit();
    }

    if (!bone) {
        console.log(chalk.red('bone not specified: ' + bone));
        process.exit();
    }

    if (!anim) {
        console.log(chalk.red('anim not specified: ' + anim));
        process.exit();
    }

    if (!output) {
        console.log(chalk.red('output not specified: ' + output));
        process.exit();
    }

    var sourceSvg;

    try {

        sourceSvg = fs.readFileSync(source).toString();

    } catch (e) {

        console.log(chalk.red('source not found: ' + source));
        process.exit();

    }

    try {

        bone = fs.readFileSync(bone);

    } catch (e) {

        console.log(chalk.red('bone not found: ' + bone));
        process.exit();

    }

    try {

        bone = JSON.parse(bone);

    } catch (e) {

        console.log(chalk.red('bone file is broken (cannot parse it as JSON)'));
        process.exit();

    }

    try {

        anim = fs.readFileSync(anim);

    } catch (e) {

        console.log(chalk.red('anim not found: ' + anim));
        process.exit();

    }

    try {

        anim = JSON.parse(anim);

    } catch (e) {

        console.log(chalk.red('anim file is broken (cannot parse it as JSON)'));
        process.exit();

    }

    console.log('All arguments look well');
    console.log('Generating output file');

    var outCss = ba2css(bone, anim);

    svg2js(sourceSvg, function (svgTree) {

        // take svg element
        var svgElem = svgTree.content.filter(function (node) {

            return node.isElem('svg');

        })[0];

        svgElem.content.push(createStyleElement(outCss));

        var outputSvg = js2svg(svgTree, {pretty: true});

        fs.writeFileSync(output, outputSvg.data);

    });

};

main(argv);
