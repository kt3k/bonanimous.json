'use strict';

var subclass = require('subclassjs');

var Bone = require('./Bone');
var BoneTree = require('./BoneTree');

var BoneFactory = subclass(function (pt) {

    /**
     * Creates the Bone list from the object list.
     *
     * @param {Array<Object>} objList
     * @return {Array<Bone>}
     */
    pt.createFromObjectList = function (objList) {

        return objList.map(function (obj) {

            return this.createFromObject(obj);

        }, this);

    };


    pt.createTreeFromObjectList = function (objList) {

        return new BoneTree(this.createFromObjectList(objList));

    };


    pt.createFromObject = function (obj) {

        return new Bone(obj);

    };

});

module.exports = BoneFactory;
