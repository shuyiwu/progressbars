module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      	options: {
        	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      	},
      	build: {
        	src: 'js/app.js',
        	dest: 'js/app.min.js'
      	}
    },
	sass: { 
	    dist: { 
	      options: {
	        style: 'compressed'
	      },
	      files: {        
	        'css/main.css': 'css/main.scss'
	      }
	    }
  	},
	jshint: {
    	all: ['Gruntfile.js', 'js/app.js', 'test/test.js']
  	}



  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'jshint']);

};