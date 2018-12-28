const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
//  entry: './src/index.js',
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
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
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

 /*     {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        })
      }*/
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
   }),
//    new ExtractTextPlugin('style.css')
  ],
  resolve: {
    extensions: ['.js','.jsx'],
  },
  devServer: {
//    proxy: {
//      '/': 'http://localhost:3000'
//    }
  }
};
