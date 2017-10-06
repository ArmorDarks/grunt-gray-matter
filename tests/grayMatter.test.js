/* eslint-env jest */

const { run, grunt } = require('./utils/grunt')
const { config, file: { expand, readJSON } } = grunt

describe('Gray Matter task', () => {
  beforeAll(() => run(['test']))

  it('should produce correct matter file with defaults for single source', () => {
    expect(readJSON(config('path.build.singleWithDefaults'))).toMatchSnapshot()
  })

  it('should produce correct matter file with defaults for multiple sources', () => {
    expect(readJSON(config('path.build.multipleWithDefaults'))).toMatchSnapshot()
  })

  it('should produce correct matter file with defaults for multiple nested sources', () => {
    expect(readJSON(config('path.build.nestedWithDefaults'))).toMatchSnapshot()
  })

  it('should produce correct matter files with defaults for multiple nested expanded sources', () => {
    const buildedFilesPaths = expand({ filter: 'isFile' }, `${config('path.build.expandedNestedWithDefaults')}/**`)

    expect(buildedFilesPaths).toMatchSnapshot()

    buildedFilesPaths.forEach((filepath) => expect(readJSON(filepath)).toMatchSnapshot())
  })
})
