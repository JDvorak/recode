var assert = require('chai').assert;
var mocha = require('mocha');
var path = require('path')
var _ = require('lodash')
var fs = require('fs')
var unified = require('unified')
var parser = require('../lib/components/parser')
var compiler = require('../lib/components/compiler')
var estree2unist = require('../lib/components/estree-to-unist')
var unist2estree = require('../lib/components/unist-to-estree')
var assertTree = require('unist-util-assert');
var async = require('async')

function getRaw(ast) {
    return JSON.parse(JSON.stringify(ast, function(key, value) {
        if ((key === "start" || key === "end") && typeof value === "number") {
            return undefined; // eslint-disable-line no-undefined
        }

        return value;
    })).body[0];
}

function normalize(string) {
  string = string.trim();
  if (string[string.length - 1] !== ";") {
      string += ";";
  }
  return string;
}

var files = fs.readdirSync(path.resolve(__dirname + '/fixtures/ast/'))

//todo: handle invalid syntax (19, 31, 32, 33)
//todo: tokens are in 1, 8, 25, 28, 29,31 
files = files.filter(function(ea, i) {
  if (i === 1 || i === 8 || i === 25 || i === 28 || i === 29 || i === 31 ||
      i === 19 || i === 31 || i === 32 || i === 33 ) {
    return false
  } else {
    return true
  }
})

async.each(files, function(ea, done) {
  var tests = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/ast/', ea), 'utf8'))

  describe('AST Feature: ' + ea.replace('.json', ''), function () {
    async.each(Object.keys(tests), function(key, next) {
      // if (key !== "try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }") return next(); 
      var expectedValue = tests[key]
      describe('Case: ' + key, function () {
        var rawESTree, astFormat, revertedEStree;
        before(function (done) {
          unified()
            .use(parser, {
                    loc: true,
                    range: true,
                    ecmaFeatures: {},
                    attachComment: false,
                    ecmaVersion: 6,
                    sourceType:'script'
                })
            .use(function testParse () {
              return function (estree) {
                rawESTree = getRaw(estree);
                return estree
              }
            })
            .use(estree2unist)
            .use(function testTransform () {
              return function (ast) {
                astFormat = _.cloneDeep(ast);
                return ast
              }
            })
            .use(unist2estree)
            .use(function testRevert() {
              return function (estree, file) {
                revertedEStree = getRaw(estree);
                return estree
              }
            })
            .use(compiler)
            .process(key, function(err) {
              if (err) console.log(err)
              done()
            })
        })

        it('should parse in accordance with the ESTree specification', function () {
          assert.deepEqual(rawESTree, expectedValue, 'Parser should behave according to esprima specification')
        })
        it('should render a valid UNIST compatible tree', function () {
          //TODO: Write a jsAST Assert library
          assertTree(astFormat)
        })
        it('should revert the AST back to the ESTree format', function () {
          assert.deepEqual(revertedEStree, expectedValue, 'Transform should be lossless.')
        })

        after(function(){next()})
      })
    });
      
  })
})





