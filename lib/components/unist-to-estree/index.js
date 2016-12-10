
function noop (node, index, parent) {
	return node;
}

function walk (ast, config) {
	//todo: rewrite walk so it doesn't mutate ast.

  visit(ast, null, config.enter, config.leave)
  function visit (node, parent, enter, leave) {
      if ( !node ) return;

      if ( enter ) {
        enter.call( this, node, parent);
      }

      for ( let i = 0; i < node.children.length; i += 1 ) {
        visit( node.children[ i ], node, enter, leave);
      }

      if ( leave ) {
        leave(node, parent);
      }
  }
  return ast
};

module.exports = function unist2estree (ast) {
  return walk( ast.children[0], {
    enter: require('./transform'),
    leave: require('./cleanup')
  });
}