const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");

const loadModeConfig = (env) =>
  require(`./build-utils/${env.mode}.config.js`)(env);

module.exports = (env) =>
  merge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, "src"),

      entry: "./index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.html$/,
            use: ["html-loader"],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[path]/[name].[ext]",
                  limit: false,
                },
              },
            ],
          },
          {
            test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[name].[ext]",
                  outputPath: "fonts/",
                  limit: 10000,
                  mimetype: "application/font-woff",
                },
              },
            ],
          },
          {
            test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  outputPath: "fonts/",
                },
              },
            ],
          },
          {
            test: /\.hbs$/,
            use: ["handlebars-loader"],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar(),
      ],
    },
    loadModeConfig(env),
  );
