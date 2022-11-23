import { config } from '@swc/core/spack';

export default config({
  entry: {
    web: __dirname + '/src/index.ts',
  },
  output: {
    path: __dirname + '/dist',
  },
  module: {},
});
