const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  devServer: {
    static: './',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve(projectRoot, 'node_modules')],
    alias: {
      TweenLite: path.resolve(projectRoot, 'example/node_modules/gsap/src/uncompressed/TweenLite'),
    },
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
          transpileOnly: true,
        },
      },
    ],
  },
  output: {
    path: projectRoot,
    filename: 'bundle.js',
  },
};
