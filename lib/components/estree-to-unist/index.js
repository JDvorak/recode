var walk = require( 'estree-walker' ).walk;

module.exports = function transformer () {
  return function estree2unist(ast) {
    //todo: rewrite walk so it doesn't mutate ast.
    walk( ast, {
      enter: require('./transform'),
      leave: require('./cleanup')
    });

    return {"type": "root", "children": [ast]}  
  }
}
