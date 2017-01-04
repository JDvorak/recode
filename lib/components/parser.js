var espree = require('espree');
var estree2unist = require('./estree-to-unist');
var xtend = require('xtend');

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 * @param {Object?} [config={}] - Configuration.
 */
function attacher (processor, config) {
  /* Attach */
  processor.Parser = Parser;

  /**
   * Espree Defaults 
   */
  var defaults = {
    loc: true,
    sourceType: 'module',
    ecmaVersion: 7,
    attachComment: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  };

  /**
   * Construct a new parser.
   *
   * @param {File} file - Virtual file.
   * @param {Object?} options - Configuration.
   */
  function Parser(file, options) {
    //TODO: Verify that a VFile was provided.
    this.file = file
    this.options = xtend(defaults, options)
  }

  /* Methods. */
  Parser.prototype.parse = parse;

  /**
   * Parse the bound virtual file.
   *
   * @this {Parser}
   * @return {HastRoot} - Hast root-node.
   */
  function parse () {
    return espree.parse(this.file.toString(), this.options);
  }
}

/* Expose. */
module.exports = attacher