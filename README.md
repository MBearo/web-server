# web-server

[![NPM version][npm-image]][npm-url]

A minimalist web server.

## Environment

Node.js >= 10

## Install

```bash
$ npm install @mbears/web-server -g
```

## Example

You can run `web-server` in project directory to start a simple server.

```bash
# simple demo
$ web-server
```

```bash
# custom port.default:3000
$ web-server --port 8888
```

```bash
# custom path.default:index.html
$ web-server --path ./dist
```

```bash
# HTML5 history mode
$ web-server --history
```

```bash
# publicPath
$ web-server --publicPath
```

```bash
# cache mode.default:3600s
$ web-server --cache
```

```bash
# custom cache time(s)
$ web-server --cache 2000
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@mbears/web-server.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@mbears/web-server
