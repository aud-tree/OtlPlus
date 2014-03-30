module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      otlPlus: {
        src: ['src/content_scripts/injector.js', 'src/popup/**/*.js'],
        options: {
          specs: 'spec/**/*Spec.js',
          vendor: ['src/vendor/*.js', 'spec/vendor/*.js'],
          display: 'short',
          summary: true,
          outfile: 'spec/specRunner.html',
          keepRunner: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['jasmine']);

}
