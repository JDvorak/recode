var escodegen = require('escodegen');
var unist2estree = require('./unist-to-estree');
var xtend = require('xtend')

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
   * Escodegen Defaults 
   */
  var defaults = {
    comment: true 
  };
  
  /**
   * Construct a new compiler.
   *
   * @param {File} file - Virtual file.
   * @param {Object?} options - Configuration.
   */
  function Compiler(file, options) {
    //Verify that a VFile was provided
    this.options = xtend(defaults, options)
    this.file = file;
  }

  /* Methods. */
  Compiler.prototype.compile = compile;


  /**
   * Compile the bound file.
   *
   * @param {Node} tree - UNIST compliant tree.
   * @return {string} - string.
   */
  function compile(tree) {
    return escodegen.generate(tree, this.options);
  }
}

/* Expose. */
module.exports = attacher;