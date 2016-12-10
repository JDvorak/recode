var unified = require('unified')

var interface = unified()
  .use(require('./components/parser'))
  .use(require('./components/compiler'))
  .abstract()

module.exports = interface; 

