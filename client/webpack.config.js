const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;
  // reduce it to a nice object
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
//  entry: './src/index.js',
return {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
/*            options: {
              modules: true,
              sourceMap: true,
              importLoader: 2
            }*/
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
   }),
   new MiniCssExtractPlugin({
     filename: "style.css",
     chunkFilenanem: "[id].css"
   }),
   new webpack.DefinePlugin(envKeys)
  ],
  resolve: {
    extensions: ['.js','.jsx'],
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:3000'
    }
  }
};
};
