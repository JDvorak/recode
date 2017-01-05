var recode = require('node-recode');
var fs = require('fs')
var exampleJS = fs.readFileSync('./example.js', 'utf8')
var map = require('unist-util-map');
var select = require('unist-util-select');

recode()
  .use(function example () {
    return function transformer (ast) {
      var target;
      select(ast, 'VariableDeclarator').forEach(function retrieveVariableName (node) {
        if (node.type.match(/VariableDeclarator/)) {

            //Grab where require is called, and where it requires 'recode'
            if (select(node, 'Callee Identifier[name=require]').length > 0 && 
                select(node, 'CallExpression Literal[value*=node-recode]').length > 0) {

              //Retrieve the variable identifier set here.
              var varNameNode = select(node, 'VariableIdentification Identifier')

              //Save it for mischevious purposes.
              target = varNameNode[0].name
            }
        }
      })
      
      return map(ast, function (node) {
        if (node.type.match('Identifier') && node.name === target) {

          //Rename the recode variable everywhere it is mentioned in this program
          node.name = "TheGreatestLibraryEver"
        }
        return node
      });
    }
  })
  .process(exampleJS, function (err, file) {
    console.log(file.contents);
  });