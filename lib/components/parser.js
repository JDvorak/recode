var toVFile = require('to-vfile');
var espree = require('espree');
var VFile = require('vfile');
var path = require('path')
var estree2unist = require('./estree-to-unist')
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
	 * Construct a new parser.
	 *
	 * @param {File} file - Virtual file.
	 * @param {Object?} options - Configuration.
	 */
	function Parser(file, options) {
	  this.file = file
	  this.options = {loc: true, sourceType: 'module', ecmaVersion: 7, comment: false, attachComment: true, ecmaFeatures: {experimentalObjectRestSpread: true}};
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
		return estree2unist(espree.parse(this.file.toString(), this.options));
	}
}

/* Expose. */
module.exports = attacher