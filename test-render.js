'use strict';

var bone = require('./box.bone');
var anim = require('./box.anim');

var compile = require('./ba2css');

var css = compile(bone, anim);

console.log(css);
