/*global describe, it, beforeEach*/
'use strict';

var
    grunt = require('grunt'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    path = require('path'),
    expect = chai.expect;

chai.use(sinonChai);

describe('grunt-libsass', function () {
    var actual, expected;


    describe('compact', function () {
        beforeEach(function () {
            actual = grunt.file.read('tmp/compact.css');
            expected = grunt.file.read('test/expected/compact.css');
        });

        it('creates the expected output when a compact format is used', function () {
            expect(actual).to.equal(expected);
        });
    });

    describe('files object', function () {
        var actual0, actual1, expected0, expected1;

        beforeEach(function () {
            actual0 = grunt.file.read('tmp/filesObject0.css');
            actual1 = grunt.file.read('tmp/filesObject1.css');
            expected0 = grunt.file.read('test/expected/filesObject0.css');
            expected1 = grunt.file.read('test/expected/filesObject1.css');
        });

        it('creates the expected output when a files object format is used', function () {
            expect(actual0).to.equal(expected0);
            expect(actual1).to.equal(expected1);
        });
    });

    describe('expand files', function () {
        it('creates all the expected output', function () {
            grunt.file.expand(['test/expected/expand/*.css'])

            .forEach(function (file) {
                var expected = grunt.file.read(file);
                var actual = grunt.file.read('tmp/expand/' + path.basename(file));
                expect(actual).to.equal(expected);
            });
        });
    });

    describe('load path', function () {

        beforeEach(function () {
            actual = grunt.file.read('tmp/loadPath.css');
            expected = grunt.file.read('test/expected/loadPath.css');
        });

        it('creates the expected output when a load path is provided', function () {
            expect(actual).to.equal(expected);
        });
    });

    describe('sourcemap', function () {
        var actualMap, expectedMap;

        beforeEach(function () {
            actual = grunt.file.read('tmp/sourcemap.css');
            expected = grunt.file.read('test/expected/sourcemap/sourcemap.css');
            actualMap = grunt.file.read('tmp/sourcemap.css.map');
            expectedMap = grunt.file.read('test/expected/sourcemap/sourcemap.css.map');
        });

        it('creates the expected output and source map', function () {
            expect(actual).to.equal(expected);
            expect(actualMap).to.equal(expectedMap);
        });
    });
});
