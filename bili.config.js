const format = process.env.FORMAT

exports.format = format

exports.moduleName = 'NoSSR'

exports.banner = true

if (format === 'umd') {
  exports.replace = {
    'process.env.NODE_ENV': JSON.stringify('production')
  }

  exports.compress = true
}
