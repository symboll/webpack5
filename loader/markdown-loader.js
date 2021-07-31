const marked = require('marked')
const { getOptions } = require('loader-utils')
module.exports = function (source) {
  const options  = getOptions(this)
  console.log('options', options)
  const html = marked(source)

  // return `module.exports = ${JSON.stringify(html)}`
  return html
}