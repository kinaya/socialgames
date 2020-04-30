const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
return {
  output: {
    publicPath: '/'
  },
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
        test: /\.(jpg|png|svg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
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
   new CopyWebpackPlugin([
     {from:'src/images', to:'images'}
   ]),
   new webpack.DefinePlugin({
     'BASE_URL': JSON.stringify(env.BASE_URL)
   })
  ],
  resolve: {
    extensions: ['.js','.jsx'],
  },
  devServer: {
    proxy: {
      '*': 'http://localhost:3000'
    }
  },
}
};
