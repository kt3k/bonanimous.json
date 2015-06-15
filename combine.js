#!/usr/bin/env node

var fs = require('fs');
var chalk = require('chalk');

var ba2css = require('./ba2css');
var svg2jquery = require('svg-jquery');

var argv = require('minimist')(process.argv.slice(2));


var main = function (argv) {

    var source = argv.source || argv.s;
    var bone = argv.bone || argv.b;
    var anim = argv.anim || argv.a;
    var output = argv.output || argv.o;
    var debug = argv.debug || argv.d;

    process.stderr.write('[source] ' + source + '\n');
    process.stderr.write('[bone]   ' + bone + '\n');
    process.stderr.write('[anim]   ' + anim + '\n');
    process.stderr.write('[output] ' + output + '\n');
    process.stderr.write('[debug]  ' + debug + '\n');

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


    return svg2jquery(sourceSvg).then(function (res) {

        var $ = res.window.jQuery;

        var BoneFactory = require('./lib/domain/BoneFactory');
        var boneTree = new BoneFactory().createTreeFromObjectList(bone);

        if (debug) {
            boneTree.getBones().forEach(function (bone) {

                $('<ellipse />', {
                    attr: {
                        cx: bone.getAbsolutePosition().x,
                        cy: bone.getAbsolutePosition().y,
                        rx: 6,
                        ry: 3,
                        stroke: 'black',
                        'stroke-width': 1,
                        'fill-opacity': 0,
                    }
                }).appendTo(res.svg.find('#' + bone.id));

            });
        }

        return res.svg.append('<style>\n' + ba2css(bone, anim) + '</style>')[0].outerHTML;

    }).then(function (svg) {

        if (output) {

            fs.writeFileSync(output, svg);

        } else {

            console.log(svg);

        }

    });


};

main(argv).catch(function (err) {

    console.log(err);
    console.log(err.stack);

});
