# Changelog

## HEAD

### Added
- Added `package.json` `main` property pointing to the task file.
- Added `package.json` `files` property to ensure that task directory will be always preserved.

### Changed
- Updated dependencies.
- Grunt and task files rewritten in pure JavaScript. Sorry, CoffeeScript :broken_heart:
- Added `.editorconfig`.

   Somehow it was missing for all that time, but still I slept without nightmares.

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