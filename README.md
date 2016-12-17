# Recode

Recode is a tiny [unified][unified] interface for translating javascript into [UNIST][unist] compliant jsAST format, performing transformations, and converting them back again! 

### Vision
Recode will bridge the three largest tree transforming javascript plugin ecosystems: [Babel][babel], [Acorn][acorn], and [Unified][unified].

### Acknowledgments
This library has only been made possible by the work of [Titus Wormer][wooorm]. Everything about Recode has been modeled after his [Rehype][rehype], [Remark][remark], and [Retext][retext] libraries, even the name!

## Todo
- [ ] Spread Operator
- [ ] Tests (haha, well, for now you can run it against the stress test)
- [ ] Usage Documentation (hint: it assumes you are using a [vfile][vfile])
- [ ] jsAST Specification
- [ ] BabylonAST<>jsAST 


[wooorm]: http://wooorm.com

[rehype]: https://github.com/wooorm/rehype

[unified]: https://github.com/wooorm/unified

[remark]: https://github.com/wooorm/remark

[retext]: https://github.com/wooorm/retext

[unist]: https://github.com/wooorm/unist

[unist-utilities]: https://github.com/wooorm/unist#list-of-utilities

[vfile]: https://github.com/wooorm/vfile

[writable-stream]: https://nodejs.org/api/stream.html#stream_class_stream_writable_1

[babel]: https://babeljs.io/

[acorn]: https://github.com/ternjs/acorn
