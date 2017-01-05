# Recode

Recode is a tiny [unified][unified] interface for translating javascript into [UNIST][unist] compliant jsAST format, performing transformations, and converting them back again! 

### Vision
Recode will bridge the three largest tree transforming javascript plugin ecosystems: [Babel][babel], [Acorn][acorn], and [Unified][unified].

### Acknowledgments
This library has only been made possible by the work of [Titus Wormer][wooorm]. Everything about Recode has been modeled after his [Rehype][rehype], [Remark][remark], and [Retext][retext] libraries, even the name! The tests couldn't be possible if not for the [espree][espree] repository itself.

## Installation

[npm][]:

```bash
npm install jdvorak/recode
```

## Usage

```js
var recode = require('recode');
var fs = require('fs')
var tests = fs.readFileSync('./example.js', 'utf8')
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
                select(node, 'CallExpression Literal[value*=recode]').length > 0) {

              //Retrieve the variable identifier set here.
              var varNameNode = select(node, 'VariableIdentification Identifier')

              //Save it for mischevious.
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
  .process(tests, function (err, file) {
    console.log(file.contents);
  });
```

Yields:

```js
var TheGreatestLibraryEver = require('recode');
var fs = require('fs');
var tests = fs.readFileSync('./example.js', 'utf8');
var map = require('unist-util-map');
var select = require('unist-util-select');
TheGreatestLibraryEver().use(function example() {
    return function transformer(ast) {
        var target;
        select(ast, 'VariableDeclarator').forEach(function retrieveVariableName(node) {
            if (node.type.match(/VariableDeclarator/)) {
                //Grab where require is called, and where it requires 'recode'
                if (select(node, 'Callee Identifier[name=require]').length > 0 && select(node, 'CallExpression Literal[value*=recode]').length > 0) {
                    //Retrieve the variable identifier set here.
                    var varNameNode = select(node, 'VariableIdentification Identifier');    //Save it for mischevious.
                    //Save it for mischevious.
                    target = varNameNode[0].name;
                }
            }
        });
        return map(ast, function (node) {
            if (node.type.match('Identifier') && node.name === target) {
                //Rename the recode variable everywhere it is mentioned in this program
                node.name = 'TheGreatestLibraryEver';
            }
            return node;
        });
    };
}).process(tests, function (err, file) {
    console.log(file.contents);
});

```


## Todo
- [ ] Extend tests to verify support for ES2015, ES6, ES7
- [ ] Spread Operator 
- [ ] Usage Documentation (hint: it assumes you are using a [vfile][vfile])
- [ ] jsAST Specification
- [ ] BabylonAST<>jsAST 


[wooorm]: http://wooorm.com

[rehype]: https://github.com/wooorm/rehype

[unified]: https://github.com/wooorm/unified

[remark]: https://github.com/wooorm/remark

[espree]: https://github.com/eslint/espree/tree/master/tests/fixtures

[retext]: https://github.com/wooorm/retext

[unist]: https://github.com/wooorm/unist

[unist-utilities]: https://github.com/wooorm/unist#list-of-utilities

[vfile]: https://github.com/wooorm/vfile

[writable-stream]: https://nodejs.org/api/stream.html#stream_class_stream_writable_1

[babel]: https://babeljs.io/

[acorn]: https://github.com/ternjs/acorn
