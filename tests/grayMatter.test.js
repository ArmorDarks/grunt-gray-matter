import { run, grunt } from '../utils/grunt'
import { join } from 'path'

const { config, file: { readJSON } } = grunt

describe('Gray Matter task', () => {
  beforeAll(async (done) => {
    await run()
    done()
  })

  it('should produce correct matter file with defaults for single page', () => {
    expect(readJSON(config('path.build.singleWithDefaults'))).toMatchSnapshot()
  })

  it('should produce correct matter file with defaults for multiple pages', () => {
    expect(readJSON(config('path.build.multipleWithDefaults'))).toMatchSnapshot()
  })

  it('should produce correct matter file with defaults for multiple nested pages', () => {
    expect(readJSON(config('path.build.nestedWithDefaults'))).toMatchSnapshot()
  })
})