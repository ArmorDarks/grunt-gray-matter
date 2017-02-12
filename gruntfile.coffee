module.exports = (grunt) ->

  require('time-grunt') grunt
  require('jit-grunt') grunt

  grunt.initConfig

    path:
      tasks: 'tasks'

      source:
        root: 'tests/fixtures'
        single: '<%= path.source.root %>/single/page.html'
        multiple: '<%= path.source.root %>/multiple'
        nested: '<%= path.source.root %>/nested'

      build:
        root: 'build'
        singleWithDefaults: '<%= path.build.root %>/singleWithDefaults.json'
        multipleWithDefaults: '<%= path.build.root %>/multipleWithDefaults.json'
        nestedWithDefaults: '<%= path.build.root %>/nestedWithDefaults.json'
        expandedNestedWithDefaults: '<%= path.build.root %>/expandedNestedWithDefaults'

  grunt.loadTasks grunt.config('path.tasks')

  grunt.config 'grayMatter',
    singleWithDefaults:
      src: '<%= path.source.single %>'
      dest: '<%= path.build.singleWithDefaults %>'
    multipleWithDefaults:
      src: '<%= path.source.multiple %>/*'
      dest: '<%= path.build.multipleWithDefaults %>'
    nestedWithDefaults:
      src: '<%= path.source.nested %>/{,**/}*.html'
      dest: '<%= path.build.nestedWithDefaults %>'
    expandedNestedWithDefaults:
      files: [
        expand: true
        cwd: '<%= path.source.nested %>'
        src: ['{,**/}*.html']
        ext: '.json'
        dest: '<%= path.build.expandedNestedWithDefaults %>'
      ]

  grunt.config 'clean',
    build:
      src: ['<%= path.build.root %>/*']

  grunt.registerTask 'default', [
    'clean'
    'grayMatter'
  ]

  return grunt