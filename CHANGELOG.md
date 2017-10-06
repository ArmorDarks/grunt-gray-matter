# Changelog

## HEAD

### Added
- Added error catching for Gray Matter with information about file which caused error for easier debugging.

   Now whenever there is an error in Fron Matter, task will not silently ignore it nor will shut down completely. Instead, it will run all files and report all encountered errors.

   If there are any errors by the end of the task, it will throw and exception.

- Added better reporting about successfully processed and failed files.
- Added `package.json` `main` property pointing to the task file.
- Added `package.json` `files` property to ensure that task directory will be always preserved.
- Added `snazzy` for better `standard` output.

### Changed
- Raised minimum required Node version to `6.0`.
- Updated dependencies.
- Updated Gray Matter to version `3.0.8`, which resolved [gray-matter#37](https://github.com/jonschlinkert/gray-matter/issues/37).

   No longer task will silently fail when Front Matter contains syntax errors :guitar:

- Replaced `lodash` with `lodash.set` to minimize dependencies.
- Grunt and task files rewritten in pure JavaScript. Sorry, CoffeeScript :broken_heart:
- Added `.editorconfig`.

   Somehow it was missing for all that time, but still I slept without nightmares.

- Other internal cleanups and improvements.

## 1.2.0

### Changed
- Task now properly works with `expand: true` option specified in `files`. If you used expanded files in task config and still want to receive monolith JSON file, use this pattern instead:

   ``` coffee
   grunt.initConfig
     grayMatter:
       build:
         src: 'source/templates/{,**/}*.html'
         dest: 'data/matter.json'
   ```

### Added
- Added standard.
- Added test case for expanded files.

### Fixed
- Task now will work properly when `expand: true` option specified in `files` by generating standalone JSON file per each source. `dest` in expanded files expect path only instead of path with filename.
- Improved performance.
- When there is no `src` provided, Grunt will return `false` according to requirements.
- Fixed wrong paths in nested fixtures.
- Fixed linting errors.

## 1.1.0

### Changed
- Optimized internals with destructuring.
- Lowered minimal required Node version.

### Added
- Added Jest as tests runner.
- Added tests of basic functionality.
- Add documentation.

## 1.0.0

Initial release