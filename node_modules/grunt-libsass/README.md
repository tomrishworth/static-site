# grunt-libsass

> Fast grunt sass compiler using libsass via node-sass

## Getting Started
This plugin requires Grunt `0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-libsass --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-libsass');
```

## The "libsass" task

*Run this task with the grunt libsass command*

This plugin automates fast compilation of scss files using [libsass](https://github.com/hcatlin/libsass) via the
[node-sass](https://github.com/andrew/node-sass) module. It aims to make coexistence with and transition from the
[grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) library as painless as possible.

**Please not that grunt-libsass is incomplete and only very lightly tested at this point.**

### Sass compatibility

As noted in the documentation for the node-sass module

> The libsass library is not currently at feature parity with the 3.2 Ruby Gem that most Sass users will use,
> and has little-to-no support for 3.3 syntax.

In other words, you may find that there are scss files it cannot compile and if there are sass 3.3 features you simply
*must* have then the afforementioned grunt-contrib-sass plugin would be a better choice.

### Options

#### options.loadPath
Type: `[String]`
Default value: `[]`

An array of paths to search for files to @import

### options.sourcemap
Type: `[String]`
Default value `false`

When set to true a sourcemap named &lt;css-file-name&gt;.map will be generated in the same location as the compiled css
file.


### Usage Examples

#### Compile a single file
In this example, the default options are used to compile a sass file

```js
grunt.initConfig({
  libsass: {
      myTarget{
          src: 'src/my.scss'
          dest: 'dist/my.css',
      }
  }
});
```

#### Compile all files in a directory, with an loadPath set
In this example, all the scss files in a directory will be compiled. Paths are set to search for files to @import

```js
grunt.initConfig({
  libsass: {
    options: {
      loadPath: ['my/load/path']
    },
    files: {[
        {
            expand: true,
            cwd: 'my/src/dir',
            src: ['**/*.scss'],
            dest: 'dist',
            ext: '.css'
        }
    ]},
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 Alpha release. Limited functionality.

0.1.1 Better documentation

0.1.2 Screwed up 0.1.1 ...

0.2.0 Added sourcemap option
