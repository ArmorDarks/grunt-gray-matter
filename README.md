grunt-gray-matter [![Build Status](https://travis-ci.org/ArmorDarks/grunt-gray-matter.svg?branch=master)](https://travis-ci.org/ArmorDarks/grunt-gray-matter)
=================

> A Grunt task for extracting data header from file contents using Gray Matter

![grunt-gray-matter task demo](https://cloud.githubusercontent.com/assets/4460311/22854588/92609ace-f07a-11e6-8c83-5cbcc7a13a7b.gif)


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create
a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

Install plugin with following command:

``` shell
npm install grunt-gray-matter --save
```

Once installed, eenable task inside your Gruntfile:

``` coffee
grunt.loadNpmTasks('grunt-gray-matter')
```

Add minimal configuration for task in Gruntfile:

``` coffee
grunt.initConfig
  grayMatter:
    build:
      files: [
        expand: true
        cwd: 'source/templates'
        src: ['{,**/}*.html']
        dest: 'data/matter.json'
      ]
```

Finally, run task with following command:

``` shell
grunt grayMatter
```


## The `grayMatter` task

Task scans specified in `files` `src` files, reads Gray Matter (Front Matter) header with [Gray Matter](https://github.com/jonschlinkert/gray-matter) and outputs collected result in form of JSON to specified `dest` file.

Path of each discovered `src` will serve as property in final JSON for extracted Gray Matter data of that `src`.

Note, that for now few `src` sets with same `dest` are unsupported and will result in JSON containing data only from last `src` set.

### Options

#### options.baseDir

Type: `String` Default: `''`

Path portion which should be subtracted from path to discovered `src` file.

Result will be used in `dest` file JSON as property of extracted Gray Matter data.

``` coffee
@config 'grayMatter',
  build:
    options:
      baseDir: 'source/templates'
    src: 'source/templates/page.html'
    dest: 'matter.json'
```

Will result in

``` json
{
  "page": {
    "html": {
      ...
    },
  }
}
```

instead of

``` json
{
  "source/templates/page": {
    "html": {
      ...
    },
  }
}
```

#### options.preprocessPath

Type: `Function` Default: `undefined`

Allows to alter path (property) under which extracted Gray Matter content will be placed in `dest` JSON file.

Will be invoked with injected following parameters:

* `path` — formed after subtracting `options.baseDir` path of current `src`;
* `src` — current `src` object.

`this` will correspond to current `file` of task.

Should return altered path in form of `String`.

#### options.preprocessMatterData

Type: `Function` Default: `undefined`

Allows to alter extracted Gray Matter data for each discovered `src`.

Will be invoked with injected following parameters:

* `matterData` — extracted Gray Matter data;
* `path` — formed after subtracting `options.baseDir` path of current `src`;
* `src` — current `src` object.

`this` will correspond to current `file` object.

Should return altered Gray Matter data in form of `Object`.

#### options.preprocessData

Type: `Function` Default: `undefined`

Allows to alter final data, constructed from extracted Gray Matter data.

Result of this function will be used for printing Object to `dest` file.

Will be invoked with injected following parameters:

* `data` — extracted and processed by `preprocessPath` and `preprocessMatterData` function (if specified) Gray Matter data.

`this` will correspond to current `this` of task.

Should return altered final data in form of `Object`, which will be printed to `dest` file.

#### options.replacer

Type: `Function|String[]|Number[]` Default: `null`

Pass [replacer](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) parameter to `JSON.stringify()`.

#### options.space

Type: `String|Integer` Default: `2`

Pass [space](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) parameter to `JSON.stringify()`.

Controls indentation for outputted JSON file.

#### options.parser

Type: `Function` Default: `undefined`

Pass [custom parser](https://github.com/jonschlinkert/gray-matter#optionsparser) to Gray Matter.

#### options.eval

Type: `Boolean` Default: `false`

Pass [eval](https://github.com/jonschlinkert/gray-matter#optionseval) parameter to Gray Matter.

Forces Gray Matter to evaluate CoffeeScript or JavaScript in Front Matter.

#### options.lang

Type: `String` Default: `undefined`

Pass [lang](https://github.com/jonschlinkert/gray-matter#optionslang) parameter to Gray Matter.

#### options.delims

Type: `String` Default: `undefined`

Pass [delims](https://github.com/jonschlinkert/gray-matter#optionsdelims) parameter to Gray Matter.



## Usage examples

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


## Node support

Task should work as expected on Node >= 0.10.0, however, due to Jest dependencies, tests will fail on any Node < 4.0.0.


## Testing

Run `npm test` to launch tests or `npm run test:watch` to watch tests. Observe how magic happens.

Testing requires Node >= 4.0.0.


## Examples

* [Kotsu Web Starter Kit](https://github.com/LotusTM/Kotsu)


## License
Copyright 2016 Serj Lavrin.

Licensed under the [Apache 2.0 license](https://github.com/LotusTM/Kotsu/blob/master/LICENSE.md).