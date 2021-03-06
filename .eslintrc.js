module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-standard',
  ],
  rules: {
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-case-declarations': 0,
    'no-cond-assign': 0,
    'no-fallthrough': 0,
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    'space-before-function-paren': [
      0,
      'always',
    ],
    'standard/no-callback-literal': 0,
  },
}
