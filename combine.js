#!/usr/bin/env node


var fs = require('fs');
var ba2css = require('./ba2css');

var argv = require('minimist')(process.argv.slice(2));

var source = argv.source;
var bone = argv.bone;
var anim = argv.anim;
var output = argv.output;



console.log('[source] ' + source);
console.log('[bone]   ' + bone);
console.log('[anim]   ' + anim);
console.log('[output] ' + output);


var sourceSvg = fs.readFileSync(source).toString();

bone = JSON.parse(fs.readFileSync(bone));
anim = JSON.parse(fs.readFileSync(anim));

var outCss = ba2css(bone, anim);

var outputSvg = sourceSvg.replace('</svg>', '<style>\n' + outCss + '\n</style>\n</svg>');

fs.writeFileSync(output, outputSvg);
