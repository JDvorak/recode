function cleanup (node) {
	node._delete && node._delete.forEach(function(key){
		delete node[key]
	})
	delete node._delete;
	if (node.children && node.children.length < 1) {
		delete node.children;
	}
	if (node.children && node.children.length > 1) {
		node.children = node.children.map(cleanup)
	}

	return node;
}


module.exports = cleanup;