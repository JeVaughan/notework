const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  target: 'web',
  plugins: plugins,
  resolve: {
    alias: { "path": "path-browserify" },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
