const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  devServer: {
    contentBase: './',
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
      },
    ],
  },
  output: {
    path: projectRoot,
    filename: 'bundle.js',
  },
};
