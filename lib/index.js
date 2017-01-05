var unified = require('unified')

var interface = unified()
  .use(require('./components/parser'))
  .use(require('./components/estree-to-unist'))
  .use(require('./components/compiler'))
  .abstract()

module.exports = interface; 

