'use strict';


module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({

        'mocha-chai-sinon': {

            test: {
                src: ['./spec/**/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                }
            }
        }

    });

};
