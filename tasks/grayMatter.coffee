{ read } = require('gray-matter')
{ set } = require('lodash')
{ cyan } = require('chalk')

module.exports = ({ registerMultiTask, log, verbose, file: { write } }) ->

  registerMultiTask 'grayMatter', 'Extract data from specified files with Gray Matter', () ->
    options = @options
      baseDir: ''
      preprocessPath: undefined
      preprocessMatterData: undefined
      preprocessData: undefined
      replacer: null
      space: 2
      parser: undefined
      eval: false
      lang: undefined
      delims: undefined

    if not @files.length
      log.error 'No files specified.'
      return false

    { preprocessPath, preprocessMatterData, preprocessData } = options
    processedFiles = 0

    @files.forEach (file) =>
      { dest, src } = file
      data = {}

      if not src.length
        log.error "No source files specified for #{cyan(dest)}."
        return false

      src.forEach (filepath) =>
        matterData = read(filepath, options).data
        path = filepath.replace(options.baseDir, '')

        if typeof preprocessPath == 'function'
          path = preprocessPath.call(file, path, filepath)

        if typeof preprocessMatterData == 'function'
          matterData = preprocessMatterData.call(file, matterData, path, filepath)

        set(data, path, matterData)
        processedFiles += 1
        verbose.ok "\nProcessed: #{cyan(filepath)}"

      if typeof preprocessData == 'function'
        data = preprocessData.call(@, data)

      write(dest, JSON.stringify(data, options.replacer, options.space))
      verbose.ok "File #{cyan(dest)} created"

    log.ok "#{cyan(processedFiles)} files processed"