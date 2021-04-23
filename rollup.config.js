import _package from './package.json';

export default {
  input: 'src/index.js',
  external: Object.keys(_package.dependencies),
  output: [
    {
      format: 'cjs',
      file: _package.main,
      exports: 'auto',
    },
    {
      format: 'esm',
      file: _package.module,
    }
  ]
};
