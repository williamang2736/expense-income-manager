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
      },
      { test: /\.css$/, loader: ["style-loader", "css-loader?url=false"] }
    ]
  },
  plugins: [new LiveReloadPlugin()]
};
