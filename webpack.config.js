const path = require('path');

module.exports = {
  entry: './src/status-card.js',  // Der Einstiegspunkt deines Projekts
  mode: 'production',
  output: {
    filename: './status-card.js',  // Die gebündelte Datei
    path: path.resolve(__dirname, 'dist'),  // Das Ausgabeziel
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Für alle .js-Dateien
        exclude: /node_modules/,  // Schließe node_modules aus
        // Der Babel-Loader wurde entfernt
      },
    ],
  },
  resolve: {
    fallback: {
      "fs": false,  // Deaktiviere Node.js-spezifische Module wie 'fs'
    }
  }
};
