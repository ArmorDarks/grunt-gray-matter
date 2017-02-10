module.exports = (grunt) ->

  require('time-grunt') grunt
  require('jit-grunt') grunt

  grunt.initConfig

    path:
      tasks: 'tasks'

      source:
        root: 'tests/fixtures'
        case1: '<%= path.source.root %>/case1'

      build:
        root: 'build'
        case1: '<%= path.build.root %>/case1.json'

  grunt.loadTasks grunt.config('path.tasks')

  grunt.config 'grayMatter',
    case1:
      options:
        baseDir: '<%= path.source.case1 %>'
      files: [
        expand: true
        cwd: '<%= path.source.case1 %>'
        src: ['{,**/}*.html']
        dest: '<%= path.build.case1 %>'
      ]

  grunt.config 'clean',
    build:
      files:
        src: ['<%= path.build.root %>/*']

  grunt.registerTask 'default', [
    'clean'
    'grayMatter'
  ]

  return grunt