# flatten-dir

This is a tool that flatten all files of a directory into an array recursively.

## Installation

```bash
$ npm install flatten-dir
```

## Usage

It will return a promise, so you can get some files by ```then``` method.

```js
const flattenDir = require('flatten-dir')

flattenDir('/foo')
  .then(files => console.log(files)) // ['baz', 'bar']
  .catch(err => console.error(err))
```

## License

MIT
