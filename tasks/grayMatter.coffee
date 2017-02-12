{ read } = require('gray-matter')
{ set } = require('lodash')
{ cyan } = require('chalk')

module.exports = ({ registerMultiTask, log, verbose, file: { write} }) ->

  registerMultiTask 'grayMatter', 'Extract data from specified files with Gray Matter', () ->
    options = @options(
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
    )

    if not @files.length
      log.error('No files specified.')
      return false

    { preprocessPath, preprocessMatterData, preprocessData } = options
    data = {}
    filedest = null
    processedFiles = []

    @files.forEach (file) =>
      filedest = file.orig.dest

      if not file.src.length
        log.error("No source files specified for #{cyan(filedest)}.")
        return false

      file.src.forEach (src) =>
        matterData = read(src, options).data
        path = src.replace(options.baseDir, '')

        if typeof preprocessPath == 'function'
          path = preprocessPath.call(file, path, src)

        if typeof preprocessMatterData == 'function'
          matterData = preprocessMatterData.call(file, matterData, path, src)

        set(data, path, matterData)
        processedFiles.push(src)

    if typeof preprocessData == 'function'
      data = preprocessData.call(@, data)

    write(filedest, JSON.stringify(data, options.replacer, options.space))

    log.ok "#{cyan(processedFiles.length)} files processed"
    verbose.ok "#{processedFiles.map((file) => "\nProcessed: #{cyan(file)}")}"
    verbose.ok "File #{cyan(filedest)} created"