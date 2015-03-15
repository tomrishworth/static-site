/*
 * grunt-libsass
 * https://github.com/project-collins/grunt-libsass
 *
 * Copyright (c) 2014 Project Collins
 * Licensed under the MIT license.
 */

'use strict';

var
    path = require('path'),
    libsass = require('node-sass'),
    chalk = require('chalk'),
    Q = require('q');


module.exports = function(grunt) {

    function makeSuccessFn(file, deferred) {
        return function (css) {
            grunt.log.writeln('Wrote file: ' + chalk.green(css));
            deferred.resolve(true);
        };
    }


    function makeErrorFn(deferred) {
        return function (error) {
            deferred.reject(error);
        };
    }


    function makeRenderOpts(file, deferred) {
        return {
            file: file.src,
            outFile: file.dest,
            includePaths: file.__libsassOptions.loadPath,
            sourceMap: file.__libsassOptions.sourcemap,
            success: makeSuccessFn(file, deferred),
            error: makeErrorFn(deferred)
        };
    }


    function checkSource(file) {
        if(file.src.length >= 1 && grunt.file.exists(file.src[0])) {
            return file;
        }

        throw new Error(file.src + ' does not exist!');
    }

    function ensureOutputDir(file) {
        grunt.file.mkdir(path.dirname(file.dest));

        return file;
    }

    function applyOptions(options, file) {
        file.__libsassOptions = options;
        return file;
    }


    function renderFileGroup(file) {
        var deferred = Q.defer();

        libsass.renderFile(makeRenderOpts(file, deferred));

        return deferred.promise;
    }


    grunt.registerMultiTask('libsass', 'Fast grunt sass compiler using libsass via node-sass', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            loadPath: [],
            sourceMap: false
        });

        var done = this.async();

        Q.all(
            this.files
            .map(applyOptions.bind(undefined, options))
            .map(checkSource)
            .map(ensureOutputDir)
            .map(renderFileGroup)
        )

        .then(function () {
            done();
        })

        .catch(function (error) {
            grunt.warn(error);
        });
    });
};
