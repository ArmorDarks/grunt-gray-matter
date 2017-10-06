const { read } = require('gray-matter')
const { set } = require('lodash')
const { cyan } = require('chalk')

module.exports = ({ registerMultiTask, log, verbose, file: { write } }) =>
  registerMultiTask('grayMatter', 'Extract data from specified files with Gray Matter', function () {
    const options = this.options({
      baseDir: '',
      preprocessPath: undefined,
      preprocessMatterData: undefined,
      preprocessData: undefined,
      replacer: null,
      space: 2,
      parser: undefined,
      eval: false,
      lang: undefined,
      delims: undefined
    })

    if (!this.files.length) return log.error('No files specified.')

    const { preprocessPath, preprocessMatterData, preprocessData } = options
    let processedFiles = 0

    this.files.forEach((file) => {
      const { dest, src } = file
      let data = {}

      if (!src.length) return log.error(`No source files specified for ${cyan(dest)}.`)

      src.forEach((filepath) => {
        let matterData = read(filepath, options).data
        let path = filepath.replace(options.baseDir, '')

        if (typeof preprocessPath === 'function') {
          path = preprocessPath.call(file, path, filepath)
        }

        if (typeof preprocessMatterData === 'function') {
          matterData = preprocessMatterData.call(file, matterData, path, filepath)
        }

        set(data, path, matterData)
        processedFiles += 1
        verbose.ok(`\nProcessed: ${cyan(filepath)}`)
      })

      if (typeof preprocessData === 'function') {
        data = preprocessData.call(this, data)
      }

      write(dest, JSON.stringify(data, options.replacer, options.space))
      verbose.ok(`File ${cyan(dest)} created`)
    })

    log.ok(`${cyan(processedFiles)} files processed`)
  })
