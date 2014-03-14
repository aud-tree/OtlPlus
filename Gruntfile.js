module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      otlPlus: {
        src: ['src/otlInjector.js'],
        options: {
          specs: 'spec/**/*Spec.js',
          vendor: ['src/jquery*.min.js', 'spec/vendor/*.js'],
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
