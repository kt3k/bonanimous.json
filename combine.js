#!/usr/bin/env node


var fs = require('fs');
var ba2css = require('./ba2css');

var source = process.argv[2];
var bone = process.argv[3];
var anim = process.argv[4];
var output = process.argv[5];



console.log('[source-svg] ' + source);
console.log('[bone.json] ' + bone);
console.log('[anim.json] ' + anim);
console.log('[output-svg] ' + output);


var sourceSvg = fs.readFileSync(source).toString();

bone = JSON.parse(fs.readFileSync(bone));
anim = JSON.parse(fs.readFileSync(anim));

var outCss = ba2css(bone, anim);

var outputSvg = sourceSvg.replace('>', '>\n<style>\n' + outCss + '\n</style>');

fs.writeFileSync(output, outputSvg);
