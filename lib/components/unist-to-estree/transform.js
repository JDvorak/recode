
/*
	Based On:
		https://github.com/estree/estree
*/

function revert (node, parent) {
	if (node._delete && node._delete.length > 0) return node;

	node.children = node.children || []
	markForDeletion(node, 'children')

	/* ALL NODES */
	if (node.location) {
		node.loc = node.location;
		markForDeletion(node, 'location')
	}

	/*Unique Recode Nodes*/
	switch (node.type) {
		case 'Text':
			break;
		case 'LineComment':
			node.type = 'Line'
			node.value = findOne(node, 'Text').value;
			if (node.trailing) {
				parent.trailingComments = (parent.trailingComments || []).concat([node])
			}
			if (node.leading) {
				parent.leadingComments = (parent.leadingComments || []).concat([node])
			}
			if (!node.leading && !node.trailing) {
				parent.comments = (parent.comments || []).concat([node])
			}
			break;
		case 'BlockComment':
			node.type = 'Block'
			node.value = findOne(node, 'Text').value;
			if (node.trailing) {
				parent.trailingComments = (parent.trailingComments || []).concat([node])
			}
			if (node.leading) {
				parent.leadingComments = (parent.leadingComments || []).concat([node])
			}
			if (!node.leading && !node.trailing) {
				parent.comments = (parent.comments || []).concat([node])
			}
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
			break;
		case 'Line': 
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
			node.raw = node.value;
			node.value = eval(node.raw);
			break;
		case 'RegExpLiteral':
			break;
		case 'Program':
			node.body = find(node, /^[A-z]*((Statement)|(Declaration))$/ )
			break;
		case 'Function':
			node.params = find(node, /Parameters/, /^[A-z]*Pattern$/ )
			node.body = findOne(node, /^[A-z]*BlockStatement$/ )
			break;
		case 'Statement':
			break;
		case 'ExpressionStatement':
			node.expression = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/  )
			break;
		case 'BlockStatement':
			node.body = find(node, /^[A-z]*((Statement)|(Declaration))$/ )
			break;
		case 'EmptyStatement':
			break;
		case 'DebuggerStatement':
			break;
		case 'WithStatement':
			node.body = findOne(node, /^[A-z]*((Statement)|(Declaration))$/ )
			node.object = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'ReturnStatement':
			node.argument = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'LabeledStatement':
			node.label = findOne(node, /^[A-z]*Identifier$/ )
			node.body = findOne(node, /^[A-z]*((Statement)|(Declaration))$/ )
			break;
		case 'BreakStatement':
			node.label = findOne(node, /^[A-z]*Identifier$/ )
			break;
		case 'ContinueStatement':
			node.label = findOne(node, /^[A-z]*Identifier$/ )
			break;
		case 'IfStatement':
			node.test = findOne(node, 'LogicalCondition', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.consequent = findOne(node, 'LogicalConsequent', /^[A-z]*((Statement)|(Declaration))$/)
			node.alternate = findOne(node, 'LogicalAlternate', /^[A-z]*((Statement)|(Declaration))$/)
			break;
		case 'SwitchStatement':
			node.discriminant = findOne(node, 'LogicalDiscriminant', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.cases = find(node, 'SwitchCase')
			break;
		case 'SwitchCase':
			node.test = findOne(node, 'LogicalCondition', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.consequent = find(node, 'LogicalConsequent', /^[A-z]*((Statement)|(Declaration))$/)
			break;
		case 'ThrowStatement':
			node.argument = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'TryStatement':
			node.block = findOne(node, 'TryBlock')
			node.finalizer = findOne(node, 'FinalizerBlock')
			node.handler = findOne(node, 'CatchClause')
			break;
		case 'CatchClause':
			node.param = findOne(node, /^[A-z]*Pattern$/)
			node.body = findOne(node, 'BlockStatement')
			break;
		case 'WhileStatement':
			node.test = findOne(node, 'LogicalCondition', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*((Statement)|(Declaration))$/)
			break;
		case 'DoWhileStatement':
			node.test = findOne(node, 'LogicalCondition', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*((Statement)|(Declaration))$/)
			break;
		case 'ForStatement':
			node.test = findOne(node, 'LogicalCondition', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.init = findOne(node, 'LoopInitializer', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty)|(VariableDeclaration))$/)
			node.update = findOne(node, 'LoopUpdate', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*((Statement)|(Declaration))$/)
			break;
		case 'ForInStatement':
			node.left = findOne(node, 'LeftOperand', /^[A-z]*((VariableDeclaration)|(Pattern))$/)
			node.right = findOne(node, 'RightOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*((Statement)|(Declaration))$/)
			break;
		case 'Declaration':
			break;
		case 'FunctionDeclaration':
			node.params = find(node, /Parameters/, /^[A-z]*Pattern$/ )
			node.body = findOne(node, /^[A-z]*BlockStatement$/ )
			break;
		case 'VariableDeclaration':
			node.declarations = find(node, 'VariableDeclarator')
			break;
		case 'VariableDeclarator':
			node.init = findOne(node, "VariableInitialization", /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.id = findOne(node, "VariableIdentification", /^[A-z]*((Pattern)|(Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'Expression':
			break;
		case 'ThisExpression':
			break;
		case 'ArrayExpression':
			node.elements = find(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'ObjectExpression':
			node.properties = find(node, /^[A-z]*Property$/)
			break;
		case 'Property':
			node.key = findOne(node, /^[A-z]*PropertyKey$/, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.value = findOne(node,/^[A-z]*PropertyValue$/, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'FunctionExpression':
			node.params = find(node, /Parameters/, /^[A-z]*Pattern$/ )
			node.body = findOne(node, /^[A-z]*BlockStatement$/ )
			break;
		case 'UnaryExpression':
			node.argument = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'UpdateExpression':
			node.argument = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'BinaryExpression':
			node.left = findOne(node, 'LeftOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.right = findOne(node, 'RightOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'AssignmentExpression':
			node.left = findOne(node, 'LeftOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty)|(Pattern))$/)
			node.right = findOne(node, 'RightOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'LogicalExpression':
			node.left = findOne(node, 'LeftOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.right = findOne(node, 'RightOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'MemberExpression':
			node.property = findOne(node, 'MemberProperty', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.object = findOne(node, 'MemberObject', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'ConditionalExpression':
			node.test = findOne(node, 'LogicalCondition', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.consequent = findOne(node, 'LogicalConsequent', /^[A-z]*((Statement)|(Declaration)|(Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.alternate = findOne(node, 'LogicalAlternate',/^[A-z]*((Statement)|(Declaration)|(Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'CallExpression':
			node.arguments = find(node, 'Arguments', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/) || []
			node.callee = findOne(node, 'Callee', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty)|(Super))$/)
			break;
		case 'NewExpression':
			node.arguments = find(node, 'Arguments', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/) || []
			node.callee = findOne(node, 'Callee', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'SequenceExpression':
			node.expressions = find(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
	}

	/*ES2015*/
	switch (node.type) {
		case 'Program':
			break;
		case 'ForOfStatement':
			node.left = findOne(node, 'LeftOperand', /^[A-z]*((VariableDeclaration)|(Pattern))$/)
			node.right = findOne(node, 'RightOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*((Statement)|(Declaration))$/)
			break;
		case 'VariableDeclaration':
			break;
		case 'Super':
			break;
		case 'CallExpression':
			node.callee = node.callee || findOne(node, /^[A-z]*Arguments$/, /^[A-z]*Super$/)
			break;
		case 'MemberExpression':
			node.object = node.object || findOne(node, /^[A-z]*MemberObject$/, /^[A-z]*Super$/ )
			break;
		case 'SpreadElement':
			node.argument = node.argument || findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'ArrayExpression':
			node.elements = (node.elements || []).concat(find(node, 'SpreadElement'))
			break;
		case 'CallExpression':
			node.arguments = (node.arguments || []).concat(find(node, 'SpreadElement'))
			break;
		case 'AssignmentExpression':
			break;
		case 'Property':
			break;
		case 'ArrowFunctionExpression':
			node.body = findOne(node, /^[A-z]*((Expression)|(BlockStatement)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.params = find(node, /Parameters/, /^[A-z]*((Expression)|(BlockStatement)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'YieldExpression':
			node.argument = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'TemplateLiteral':
			node.expressions = find(node, /^[A-z]*TemplateExpressions$/, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.quasis = find(node, /^[A-z]*TemplateQuasis$/,  /^[A-z]*(TemplateElement)$/ )
			break;
		case 'TaggedTemplateExpression':
			node.tag = findOne(node, /^[A-z]*TemplateTag$/, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.quasis = findOne(node, /^[A-z]*TemplateQuasis$/, /^[A-z]*TemplateElementl$/ )
			break;
		case 'TemplateElement':
			node.value = findOne(node, /^[A-z]*TemplateValue$/)
			delete node.value.type
			break;
		case 'AssignmentProperty':
			node.value = findOne(node, /^[A-z]*Pattern$/ )
			break;
		case 'ObjectPattern':
			node.properties = find(node, /^[A-z]*Property$/ )
			break;
		case 'ArrayPattern':
			node.elements = find(node, /^[A-z]*Pattern$/ )
			break;
		case 'RestElement':
			node.argument = findOne(node, /^[A-z]*Pattern$/ )
			break;
		case 'AssignmentPattern':
			node.left = findOne(node, 'LeftOperand', /^[A-z]*((Pattern)|(Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.right = findOne(node, 'RightOperand', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			break;
		case 'ClassDeclaration':
			node.superClass = findOne(node, /^[A-z]*SuperClass$/, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*ClassBody$/)
			break;
		case 'Class':
			node.superClass = findOne(node, /^[A-z]*SuperClass$/, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*ClassBody$/)
			break;
		case 'ClassBody':
			node.body = find(node, /^[A-z]*MethodDefinition$/)
			break;
		case 'MethodDefinition':
			node.key = findOne(node, 'MethodKey', /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.value = findOne(node, 'MethodValue', /^[A-z]*FunctionExpression$/)
			break;
		case 'ClassExpression':
			node.superClass = findOne(node, /^[A-z]*SuperClass$/, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/)
			node.body = findOne(node, /^[A-z]*ClassBody$/)
			break;
		case 'MetaProperty':
			break;
		case 'ModuleDeclaration':
			break;
		case 'ModuleSpecifier':
			break;
		case 'ImportDeclaration':
			node.specifiers = find(node, /^[A-z]*((ImportSpecifier)|(ImportDefaultSpecifier)|(ImportNamespaceSpecifier))$/)
			node.source = findOne(node, /^[A-z]*Literal$/)
			break;
		case 'ImportSpecifier':
			break;
		case 'ImportDefaultSpecifier':
			break;
		case 'ImportNamespaceSpecifier':
			break;
		case 'ExportNamedDeclaration':
			node.specifiers = find(node, /^[A-z]*ExportSpecifier$/)
			node.declaration = findOne(node, /^[A-z]*(Declaration)|(Expression)$/)
			node.source = findOne(node, /^[A-z]*Literal$/)
			break;
		case 'ExportSpecifier':
			break;
		case 'ExportDefaultDeclaration':
			node.specifiers = find(node, /^[A-z]*ExportSpecifier$/)
			node.declaration = findOne(node, /^[A-z]*((Declaration)|(Expression))$/)
			break;
		case 'ExportAllDeclaration':
			node.source = find(node, /^[A-z]*Literal$/)
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
			break;
		case 'ExperimentalSpreadProperty':
			node.argument = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/  )
			break;
		case 'SpreadProperty':
			node.argument = findOne(node, /^[A-z]*((Expression)|(Identifier)|(Literal)|(MetaProperty))$/  )
			break;
		case 'ObjectPattern':
			break;
		case 'ObjectExpression':
			break;
	}
	return node;
}

function find (node, type, subtypes) {
	if (!node.children || node.children.length <= 0) return []
	var children = [];
	var slicedArgs = Array.prototype.slice.call(arguments, 2);
	
	children = node.children.filter(function(node) {
		return node.type.match(type)
	})

	if (children.length >= 1 && slicedArgs.length >= 1) {
		return children.reduce(function (children, node) {
			var child = find.apply(this, [node].concat(slicedArgs));
			if (child) {
				children = children.concat(child)
			}
			return children;
		}, [])
	}

	return children;
}


function findOne(node, type, key, subtypes) {
	var arr = find.apply(this, arguments)
	if (arr instanceof Array) {
		return arr[0]
	} else {
		return arr;
	}
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

module.exports = revert