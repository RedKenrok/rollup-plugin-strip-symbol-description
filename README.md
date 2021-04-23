# rollup-plugin-strip-symbol-description

A rollup plugin to remove the descriptions of `Symbol`s.

## Install

Using npm:

```console
npm install rollup-plugin-strip-symbol-description --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import stripSymbolDescription from 'rollup-plugin-strip-symbol-description';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    stripSymbolDescription({
      /* Options */
    })
  ]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

### `include`

Type: `String | RegExp | Array[...String|RegExp]`<br>
Default: `['**/*.js']`<br>
Example: `include: '**/*.(mjs|js)',`<br>

A pattern, or array of patterns, which specify the files in the build the plugin should operate on.

### `exclude`

Type: `String | RegExp | Array[...String|RegExp]`<br>
Default: `[]`<br>
Example: `exlude: 'tests/**/*',`<br>

A pattern, or array of patterns, which specify the files in the build the plugin should _ignore_.

### `sourceMap`

Type: `Boolean`<br>
Default: `true`<br>
Example: `sourceMap: false,`<br>

If `true`, instructs the plugin to update source maps accordingly after removing configured targets from the bundle.

## Meta

[LICENSE (MIT)](/LICENSE)
