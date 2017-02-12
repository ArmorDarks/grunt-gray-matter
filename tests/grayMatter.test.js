/* eslint-env jest */

import { run, grunt } from './utils/grunt'
import { join } from 'path'

const { config, file: { readJSON } } = grunt

describe('Gray Matter task', () => {
  beforeAll(() => run())

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
    const dest = config('path.build.expandedNestedWithDefaults')

    expect(readJSON(join(dest, 'page1.json'))).toMatchSnapshot()
    expect(readJSON(join(dest, 'page2.json'))).toMatchSnapshot()
    expect(readJSON(join(dest, 'level2/page3.json'))).toMatchSnapshot()
    expect(readJSON(join(dest, 'level2/pageWithoutMatter.json'))).toMatchSnapshot()
    expect(readJSON(join(dest, 'level2/pageWithoutMatter.json'))).toMatchSnapshot()
    expect(readJSON(join(dest, 'level2/level3//page4.json'))).toMatchSnapshot()
    expect(readJSON(join(dest, 'level2/level3//page5.json'))).toMatchSnapshot()
  })
})
