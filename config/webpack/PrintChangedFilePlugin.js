const path = require('path')

class PrintChangedFilePlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchRun', comp => {
      if (comp.modifiedFiles) {
        const changedFiles = Array.from(comp.modifiedFiles, file => `\n  ${path.relative(path.resolve(__dirname, '../..'), file)}`).join('')
        console.log('===============================')
        console.log(`FILES CHANGED:${changedFiles}`)
        console.log('===============================')
      }
    })
  }
}

module.exports = PrintChangedFilePlugin
