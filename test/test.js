const path = require('path')
const glob = require('glob')
const generate = require('../lib/index')
const files = glob.sync('./pages/**/index.js')
generate({
  list: files,
  singleRouteName: 'common',
  ignored: [],
  dir: 'pages',
  output: (name) => {
    const result = path.resolve(__dirname, 'router/router-' + name + '.js')
    return result
  },
})
