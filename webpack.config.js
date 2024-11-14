const path = require('path');

module.exports = {
  entry: './src/index.js', 
  mode: 'production',
  output: {
    filename: './status-card.js',  
    path: path.resolve(__dirname, 'dist'),  
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
      },
    ],
  },
  resolve: {
    fallback: {
      "fs": false,  
    }
  }
};
