#!/usr/bin/env node

var fs = require('fs');
var chalk = require('chalk');

var ba2css = require('./ba2css');
var svg2jquery = require('svg-jquery');

var argv = require('minimist')(process.argv.slice(2));


var main = function (argv) {

    var source = argv.source;
    var bone = argv.bone;
    var anim = argv.anim;
    var output = argv.output;

    process.stderr.write('[source] ' + source + '\n');
    process.stderr.write('[bone]   ' + bone + '\n');
    process.stderr.write('[anim]   ' + anim + '\n');
    process.stderr.write('[output] ' + output + '\n');

    if (!source) {
        process.stderr.write(chalk.red('--source not specified') + '\n');
        process.exit();
    }

    if (!bone) {
        process.stderr.write(chalk.red('--bone not specified') + '\n');
        process.exit();
    }

    if (!anim) {
        process.stderr.write(chalk.red('--anim not specified') + '\n');
        process.exit();
    }

    if (!output) {

        process.stderr.write('--output not specified, then output to stdout.' + '\n');

    }

    var sourceSvg;

    try {

        sourceSvg = fs.readFileSync(source).toString();

    } catch (e) {

        process.stderr.write(chalk.red('source not found: ' + source) + '\n');
        process.exit();

    }

    try {

        bone = fs.readFileSync(bone);

    } catch (e) {

        process.stderr.write(chalk.red('bone not found: ' + bone) + '\n');
        process.exit();

    }

    try {

        bone = JSON.parse(bone);

    } catch (e) {

        process.stderr.write(chalk.red('bone file is broken (cannot parse it as JSON)' + '\n'));
        process.exit();

    }

    try {

        anim = fs.readFileSync(anim);

    } catch (e) {

        process.stderr.write(chalk.red('anim not found: ' + anim) + '\n');
        process.exit();

    }

    try {

        anim = JSON.parse(anim);

    } catch (e) {

        process.stderr.write(chalk.red('anim file is broken (cannot parse it as JSON)') + '\n');
        process.exit();

    }

    process.stderr.write('All arguments look well' + '\n');
    process.stderr.write('Generating output file' + '\n');

    var outCss = ba2css(bone, anim);

    return svg2jquery(sourceSvg).then(function (res) {

        var outputSvg = res.svg.append('<style>\n' + outCss + '</style>')[0].outerHTML;

        if (output) {

            fs.writeFileSync(output, outputSvg);

        } else {

            console.log(outputSvg);

        }

    });

};

main(argv).catch(function (err) {

    console.log(err);
    console.log(err.stack);

});
