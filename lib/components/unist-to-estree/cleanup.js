
function cleanup (node, parent) {
	node._delete && node._delete.forEach(function(key){
		delete node[key]
	})
	if (node.comments && node.comments.length < 1) delete node.comments;
	if (node.trailingComments && node.trailingComments.length < 1) delete node.trailingComments;
	if (node.leadingComments && node.leadingComments.length < 1) delete node.leadingComments;
	delete node._delete
	return node;
}


module.exports = cleanup;