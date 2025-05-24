const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/_redirects', to: '' }
      ]
    })
  ]
};
