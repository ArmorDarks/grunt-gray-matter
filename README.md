grunt-gray-matter
=================

> A Grunt task for extracting data header from file contents using Gray Matter

Sorry folks, no details instructions yet.

Usage examples
--------------

``` coffee
@config 'grayMatter',
  build:
    options:
      baseDir: 'source/templates'

      preprocessPath: (path) ->
        # do something with paths in constructed json file
        return path

      preprocessMatterData: (data, path, src) ->
        # do something with extracted data
        return data

    files: [
      expand: true
      cwd: 'source/templates'
      src: ['{,**/}*.{nj,html}', '!{,**/}_*.{nj,html}']
      dest: '/data/matter.json'
    ]
```