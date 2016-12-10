
/*
	Based On:
		https://github.com/estree/estree
*/

function convert (node, parent) {
	if ((node instanceof Array) || (node._delete && node._delete.length)) return node;
	node.children = node.children || []
	/* ALL NODES */
	if (node.loc) {
		node.location = node.loc;
		markForDeletion(node, 'loc', 'start', 'end')
	}
	if (node.comments) {
		addChildren(node, 'comments')
	}
	if (node.trailingComments) {
		addChildren(node, stamp(node.trailingComments, {trailing: true}));
		markForDeletion(node, 'trailingComments')
	}
	if (node.leadingComments) {
		addChildren(node, stamp(node.leadingComments, {leading: true}));
		markForDeletion(node, 'leadingComments')
	}

	/*Unique Recode Nodes*/
	switch (node.type) {
		case 'Text':
			break;
		case 'LineComment':
			break;
		case 'BlockComment':
			break;
		case 'MethodKey':
			break;
		case 'MethodValue':
			break;
		case 'LogicalCondition':
			break;
		case 'LogicalConsequent':
			break;
		case 'LogicalAlternate':
			break;
		case 'LogicalDiscriminant':
			break;
		case 'TryBlock':
			break;
		case 'FinalizerBlock':
			break;
		case 'LoopInitializer':
			break;
		case 'LoopUpdate':
			break;
		case 'LeftOperand':
			break;
		case 'RightOperand':
			break;
		case 'PropertyKey':
			break;
		case 'PropertyValue':
			break;
		case 'MemberObject':
			break;
		case 'MemberProperty':
			break;
		case 'Arguments':
			break;
		case 'Callee':
			break;
		case 'TemplateTag':
			break;
		case 'TemplateValue':
			break;
		case 'SuperClass':
			break;
		case 'MethodKey':
			break;
		case 'MethodValue':
			break;
		case 'ImportDeclaration':
			break;
		case 'ImportSource':
			break;
		case 'ExportSource':
			break;
		case 'ExportDeclaration':
			break;

	}

	/*Espree Comment Nodes*/
	switch (node.type) {
		case 'Block': 
			if (node.value) {
				node.type = 'BlockComment'
				addChildren(node, {type: 'Text', value: node.value})
				markForDeletion(node, 'value')
			}
			break;
		case 'Line': 
			if (node.value) {
				node.type = 'LineComment'
				addChildren(node, {type: 'Text', value: node.value})
				markForDeletion(node, 'value')
			}
			break;
	}

	/*ES5*/
	switch (node.type) {
		case 'SourceLocation':
			break;
		case 'Position':
			break;
		case 'Identifier':
			break;
		case 'Literal':
			node.value = node.raw || node.value + ""
			markForDeletion(node, 'raw')
		case 'RegExpLiteral':
			break;
		case 'Program':
			addChildren(node, 'body')
			break;
		case 'Function':
			addChildren(node, wrap('Parameters', node.params), 'body')
			markForDeletion(node, 'params');
		case 'Statement':
			break;
		case 'ExpressionStatement':
			addChildren(node, 'expression')
		case 'BlockStatement':
			addChildren(node, 'body')
		case 'EmptyStatement':
			break;
		case 'DebuggerStatement':
			break;
		case 'WithStatement':
			addChildren(node, 'object', 'body')
			break;
		case 'ReturnStatement':
			addChildren(node, 'argument')
			break;
		case 'LabeledStatement':
			addChildren(node, 'label', 'body')
			break;
		case 'BreakStatement':
			addChildren(node, 'label')
			break;
		case 'ContinueStatement':
			addChildren(node, 'label')
			break;
		case 'IfStatement':
			addChildren(node, 
					wrap("LogicalCondition", node.test), 
					wrap("LogicalConsequent", node.consequent), 
					wrap("LogicalAlternate", node.alternate))
			markForDeletion(node, 'test', 'consequent', 'alternate')
			break;
		case 'SwitchStatement':
			addChildren(node, wrap("LogicalDiscriminant", node.discriminant), 'cases') 
			markForDeletion(node, 'discriminant')
			break;
		case 'SwitchCase':
			addChildren(node, wrap("LogicalCondition", node.test), wrap("LogicalConsequent", node.consequent)) 
			markForDeletion(node, 'discriminant', 'consequent', 'test')
			break;
		case 'ThrowStatement':
			addChildren(node, 'argument')
			break;
		case 'TryStatement':
			addChildren(node,
					wrap("TryBlock", node.block), 
					wrap("FinalizerBlock", node.finalizer),
					'handler')
			markForDeletion('block', 'finalizer')
			break;
		case 'CatchClause':
			addChildren(node, wrap('Parameters', node.params), 'body')
			markForDeletion(node, 'params');
			break;
		case 'WhileStatement':
			addChildren(node, wrap("LogicalCondition", node.test), 'body')
			markForDeletion(node, 'test')
			break;
		case 'DoWhileStatement':
			addChildren(node, wrap("LogicalCondition", node.test), 'body')
			markForDeletion(node, 'test')
			break;
		case 'ForStatement':
			addChildren(node, 
				wrap("LogicalCondition", node.test), 
				wrap("LoopInitializer", node.init),
				wrap("LoopUpdate", node.update),
				'body')
			markForDeletion(node, 'test', 'init', 'update')
			break;
		case 'ForInStatement':
			addChildren(node, wrap("LeftOperand", node.left), wrap("RightOperand", node.right), 'body')
			markForDeletion(node, 'left', 'right', 'update')
			break;
		case 'Declaration':
			break;
		case 'FunctionDeclaration':
			addChildren(node, wrap('Parameters', node.params), 'body')
			markForDeletion(node, 'params')
			break;
		case 'VariableDeclaration':
			addChildren(node, 'declarations')
			break;
		case 'VariableDeclarator':
			addChildren(node, wrap("VariableInitialization", node.init), wrap("VariableIdentification", node.id))
			markForDeletion(node, 'init', 'id')
			break;
		case 'Expression':
			break;
		case 'ThisExpression':
			break;
		case 'ArrayExpression':
			addChildren(node, 'elements')
			break;
		case 'ObjectExpression':
			addChildren(node, 'properties')
			break;
		case 'Property':
			addChildren(node, wrap('PropertyKey', node.key), wrap('PropertyValue', node.value))
			markForDeletion(node, 'key', 'value')
			break;
		case 'FunctionExpression':
			addChildren(node, wrap('Parameters', node.params), 'body')
			markForDeletion(node, 'params')

			break;
		case 'UnaryExpression':
			addChildren(node, 'argument')
			break;
		case 'UpdateExpression':
			addChildren(node, 'argument')
			break;
		case 'BinaryExpression':
			addChildren(node, wrap('LeftOperand', node.left), wrap('RightOperand', node.right))
			markForDeletion(node, 'left', 'right')
			break;
		case 'AssignmentExpression':
			addChildren(node, wrap('LeftOperand', node.left), wrap('RightOperand', node.right))
			markForDeletion(node, 'left', 'right')
			break;
		case 'LogicalExpression':
			addChildren(node, wrap('LeftOperand', node.left), wrap('RightOperand', node.right))
			markForDeletion(node, 'left', 'right')
			break;
		case 'MemberExpression':
			addChildren(node, wrap('MemberObject', node.object), wrap('MemberProperty', node.property))
			markForDeletion(node, 'object', 'property')
			break;
		case 'ConditionalExpression':
			addChildren(node, 
					wrap("LogicalCondition", node.test), 
					wrap("LogicalConsequent", node.consequent), 
					wrap("LogicalAlternate", node.alternate))
			markForDeletion(node, 'test', 'consequent', 'alternate')
			break;
		case 'CallExpression':
			addChildren(node, wrap('Arguments', node.arguments), wrap('Callee', node.callee))
			markForDeletion(node, 'callee', 'arguments')
			break;
		case 'NewExpression':
			addChildren(node, wrap('Arguments', node.arguments), wrap('Callee', node.callee))
			markForDeletion(node, 'callee', 'arguments')
			//TODO:
			break;
		case 'SequenceExpression':
			addChildren(node, 'expressions')
			break;
	}

	/*ES2015*/
	switch (node.type) {
		case 'Program':
			break;
		case 'ForOfStatement':
			addChildren(node, wrap("LeftOperand", node.left), wrap("RightOperand", node.right), 'body')
			markForDeletion(node, 'left', 'right', 'update')
			break;
		case 'VariableDeclaration':
			break;
		case 'Super':
			break;
		case 'CallExpression':
			break;
		case 'MemberExpression':
			break;
		case 'SpreadElement':
			addChildren(node, 'argument')
			break;
		case 'ArrayExpression':
			break;
		case 'AssignmentExpression':
			break;
		case 'Property':
			break;
		case 'ArrowFunctionExpression':
			addChildren(node, 'body', wrap('Parameters', node.params))
			markForDeletion(node, 'params')

			break;
		case 'YieldExpression':
			addChildren(node, 'argument')
			break;
		case 'TemplateLiteral':
			addChildren(node, wrap('TemplateQuasis', node.quasis), wrap('TemplateExpressions', node.expressions))
			markForDeletion(node, 'quasis', 'expressions')
			break;
		case 'TaggedTemplateExpression':
			addChildren(node, wrap('TemplateTag', node.tag), wrap('TemplateQuasis', node.quasis))
			markForDeletion(node, 'tag', 'quasis')
			break;
		case 'TemplateElement':
			if (node.value) {
				addChildren(node, stamp(node.value, {type: 'TemplateValue'}))
				markForDeletion(node, 'value')
			}
			break;
		case 'AssignmentProperty':
			addChildren(node, 'value')
			break;
		case 'ObjectPattern':
			addChildren(node, 'properties')
			break;
		case 'ArrayPattern':
			addChildren(node, 'elements')
			break;
		case 'RestElement':
			addChildren(node, 'argument')
			break;
		case 'AssignmentPattern':
			addChildren(node, wrap("LeftOperand", node.left), wrap("RightOperand", node.right), 'body')
			markForDeletion(node, 'left', 'right')
			break;
		case 'Class':
			addChildren(node, wrap('SuperClass', node.superClass), 'body')
			markForDeletion(node, 'superClass')
			break;
		case 'ClassBody':
			addChildren(node, 'body')
			break;
		case 'MethodDefinition':
			addChildren(node, wrap('MethodKey', node.key), wrap('MethodValue', node.value))
			markForDeletion(node, 'key', 'value')
			break;
		case 'ClassDeclaration':
			addChildren(node, wrap('SuperClass', node.superClass), 'body')
			markForDeletion(node, 'superClass')
			break;
		case 'ClassExpression':
			addChildren(node, wrap('SuperClass', node.superClass), 'body')
			markForDeletion(node, 'superClass')
			break;
		case 'MetaProperty':
			break;
		case 'ModuleDeclaration':
			break;
		case 'ModuleSpecifier':
			break;
		case 'ImportDeclaration':
			addChildren(node, 'specifiers', 'source')
			break;
		case 'ImportSpecifier':
			break;
		case 'ImportDefaultSpecifier':
			break;
		case 'ImportNamespaceSpecifier':
			break;
		case 'ExportNamedDeclaration':
			addChildren(node, 'specifiers', 'declaration', 'source')
			break;
		case 'ExportSpecifier':

			break;
		case 'ExportDefaultDeclaration':
			addChildren(node, 'declaration')
			break;
		case 'ExportAllDeclaration':
			addChildren(node, 'source')
			break;
	}

	/*ES2016*/
	switch (node.type) {
		case 'BinaryOperator':
			//TODO: Find spec and implement translation
			break;
		case 'AssignmentOperator':
			//TODO: Find spec and implement translation
			break;
	}

	/*Spread Operator*/
	switch (node.type) {
		case 'RestProperty':
			addChildren(node, 'argument')
			break;
		case 'ExperimentalSpreadProperty':
			addChildren(node, 'argument')
			break;
		case 'SpreadProperty':
			addChildren(node, 'argument')
			break;
		case 'ObjectPattern':
			break;
		case 'ObjectExpression':
			break;
	}

	return node;
}

function addChildren (node, key) {
	var slicedArgs = Array.prototype.slice.call(arguments, 1);
	if (slicedArgs.length >= 2) {
		return slicedArgs.forEach(function(ea) {
			addChildren(node, ea);
		})
	}
	markForDeletion(node, key);

	if (key == null) return;
	
	if (key instanceof Object) {
		var child = key
	} else {
		var child = node[key];
	}

	if (child == null) return;

	if (child instanceof Array) {
		child = child.map(convert)
		node.children = node.children.concat(child)
	} else {
		node.children.push(convert(child))
	}
}


function wrap(type, val) {
	var node;
	if (val == null || (val.length && val.length === 0)) {
		return;
	}
	if (val instanceof Array) {
		node = {"type": type, children: val};
	} else {
		node = {"type": type, children: [val]}
	}

	return node;
}

function stamp (obj, stampObj) {
	if (obj instanceof Array) {
		return obj.map(function(each) {
			return stamp(each, stampObj)
		})
	}
	var newObj = {}
	for (var key in obj) {
		newObj[key] = obj[key]
	}
	for (var key in stampObj) {
		newObj[key] = stampObj[key]
	}

	return newObj;
}

function markForDeletion(node, key) {
	var slicedArgs = Array.prototype.slice.call(arguments, 1);
	if (slicedArgs.length >= 2) {
		return slicedArgs.forEach(function(ea) {
			markForDeletion(node, ea);
		})
	}
	node._delete = node._delete || [];
	node._delete.push(key);
}


module.exports = convert