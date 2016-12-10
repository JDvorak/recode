var escodegen = require('escodegen');
var unist2estree = require('./unist-to-estree');
var ObjectAssign = require('object-assign');


/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
  * @param {Object?} [config={}] - Configuration.
 */
function attacher (processor, config) {
  
  /* Attach */
  processor.Compiler = Compiler;

  /**
   * Construct a new compiler.
   *
   * @param {File} file - Virtual file.
   * @param {Object?} options - Configuration.
   */
  function Compiler(file, options) {
    this.options = options;
    this.file = file;
  }

  /* Methods. */
  Compiler.prototype.compile = compile;


  /**
   * Compile the bound file.
   *
   * @param {Node} tree - UNIST node.
   * @return {string} - string.
   */
  function compile(tree) {
    return escodegen.generate(unist2estree(tree), {comment: true});
  }
}

/* Expose. */
module.exports = attacher;