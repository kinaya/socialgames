const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
   })
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
