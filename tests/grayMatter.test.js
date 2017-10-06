/* eslint-env jest */

const { runGrunt, grunt } = require('./utils/grunt')
const { config, file: { expand, readJSON } } = grunt

describe('Gray Matter task', () => {
  beforeAll(() => runGrunt(['clean']))

  it('should produce correct matter file with defaults for single source', () =>
    runGrunt(['grayMatter:singleWithDefaults']).then(() =>
      expect(readJSON(config('path.build.singleWithDefaults'))).toMatchSnapshot()
    )
  )

  it('should produce correct matter file with defaults for multiple sources', () =>
    runGrunt(['grayMatter:multipleWithDefaults']).then(() =>
      expect(readJSON(config('path.build.multipleWithDefaults'))).toMatchSnapshot()
    )
  )

  it('should produce correct matter file with defaults for multiple nested sources', () => {
    runGrunt(['grayMatter:nestedWithDefaults']).then(() =>
      expect(readJSON(config('path.build.nestedWithDefaults'))).toMatchSnapshot()
    )
  })

  it('should produce correct matter files with defaults for multiple nested expanded sources', () =>
    runGrunt(['grayMatter:expandedNestedWithDefaults']).then(() => {
      const buildedFilesPaths = expand({ filter: 'isFile' }, `${config('path.build.expandedNestedWithDefaults')}/**`)

      expect(buildedFilesPaths).toMatchSnapshot()

      buildedFilesPaths.forEach((filepath) => expect(readJSON(filepath)).toMatchSnapshot())
    })
  )
})
