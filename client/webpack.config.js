const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const dotenv = require('dotenv');
const webpack = require("webpack");

module.exports = (env) => {
  const { DEV } = env;

  if(DEV) {
    dotenv.config({path: './dev.env'})
  } else {
    dotenv.config({path: './prod.env'})
  }

  return {
    name: "HLOG_V2",
    mode: "development",
    entry: "./src/index.tsx",
    devtool: 'eval',
    output: {
      filename: "bundle.[chunkhash].js",
      path: path.resolve("dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[ext]?[chunkhash]",
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico"
      }),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      historyApiFallback: true,
      compress: true,
      port: 3080,
    },
  }
};
