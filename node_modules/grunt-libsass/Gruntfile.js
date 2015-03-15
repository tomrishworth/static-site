/*
    * grunt-libsass
    * https://github.com/project-collins/grunt-libsass
    *
    * Copyright (c) 2014 Andrew Smith
    * Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/*.js',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },

        // Configuration to be run (and then tested).
        libsass: {
            compact: {
                src: 'test/fixtures/short.scss',
                dest: 'tmp/compact.css'
            },
            filesObject: {
                files: {
                    'tmp/filesObject0.css': 'test/fixtures/filesObject0.scss',
                    'tmp/filesObject1.css': 'test/fixtures/filesObject1.scss'
                }
            },
            expandFiles: {
                files: [{
                    expand: true,
                    cwd: 'test/fixtures/expand',
                    src: ['*.scss'],
                    dest: 'tmp/expand',
                    ext: '.css'
                }]
            },
            loadPath: {
                src: 'test/fixtures/loadPath/main/main.scss',
                dest: 'tmp/loadPath.css',
                options: {
                    loadPath: ['test/fixtures/loadPath/include']
                }
            },
            sourcemap: {
                src: 'test/fixtures/sourcemap/sheet.scss',
                dest: 'tmp/sourcemap.css',
                options: {
                    sourcemap: true
                }
            }
        },

        // Unit tests.
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                },
                src: ['test/*.js']
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'libsass', 'mochaTest']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
