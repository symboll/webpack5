class TestPlugin {
  constructor (options) {
    console.log('配置选选', options)
    this.options = options || { target: '.css' }
  }

  apply (compiler) {
    compiler.hooks.emit.tap('TestPlugin', compilation => {
      for(const name in compilation.assets) {
        console.log('name  =>', name)
        if(name.endsWith(this.options.target)){
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*[\s\S]*?\*\//g, '')

          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}

module.exports = TestPlugin
