const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  optimization: {
    usedExports: true,
    minimize: true,
  },
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|mjs)$/,
        resolve: {
          fullySpecified: false, // don't require .mjs extension for module packages
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    //contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3005,
    open: true,
    historyApiFallback: true,
  },
  mode: "production", // Change to 'production' for production build
};
