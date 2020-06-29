# hz-pages

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> 关于封装gulp工作流

## Installation

```shell
$ npm install hz-pages

# or yarn
$ yarn add hz-pages
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const hzPages = require('hz-pages')
const result = hzPages('hz')
// result => 'hz@hz.me'
```

## API

<!-- TODO: Introduction of API -->

### hzPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'hz.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; hzuhen <18603971357@163.com>



[downloads-image]: https://img.shields.io/npm/dm/hz-pages.svg
[downloads-url]: https://npmjs.org/package/hz-pages
[version-image]: https://img.shields.io/npm/v/hz-pages.svg
[version-url]: https://npmjs.org/package/hz-pages
[license-image]: https://img.shields.io/github/license/haven09/hz-pages.svg
[license-url]: https://github.com/haven09/hz-pages/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/haven09/hz-pages.svg
[dependency-url]: https://david-dm.org/haven09/hz-pages
[devdependency-image]: https://img.shields.io/david/dev/haven09/hz-pages.svg
[devdependency-url]: https://david-dm.org/haven09/hz-pages?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
