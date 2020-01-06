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
# custom port
$ web-server -port 8888
```

```bash
# custom path
$ web-server -path ./dist
```

```bash
# HTML5 history mode
$ web-server -history
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@mbears/web-server.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@mbears/web-server
