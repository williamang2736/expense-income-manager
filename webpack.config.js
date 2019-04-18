const path = require("path");
var LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new LiveReloadPlugin()]
};

// protocol - (Default: protocol of the page, either http or https) Protocol for livereload <script> src attribute value
// port - (Default: 35729) The desired port for the livereload server. If you define port 0, an available port will be searched for, starting from 35729.
// hostname - (Default: hostname of the page, like localhost or 10.0.2.2) The desired hostname for the appended <script> (if present) to point to
// appendScriptTag - (Default: false) Append livereload <script> automatically to <head>.
// ignore - (Default: null) RegExp of files to ignore. Null value means ignore nothing.
// delay - (Default: 0) amount of milliseconds by which to delay the live reload (in case build takes longer)
