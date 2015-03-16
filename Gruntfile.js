module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      options: {
        pretty: true,
      },
      compile: {
        files: {
          "build/index.html": ["src/index.jade"]
        }
      }
    },
    libsass: {
      files: {
          src: 'src/sass/style.scss',
          dest: 'build/css/style.css'
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      css: {
        files: ['src/sass/**/*.scss'],
        tasks: ['libsass'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    concat: {
      js: {
        src: [
          'bower_components/jquery/dist/jquery/js',
          'bower_components/bootstrap-sass-offical/assets/javascripts/bootstrap.js',
          'assets/js/*.js'
        ],
        dest: 'build/js/scripts.js',
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'build/',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-libsass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['watch', 'connect']);
};