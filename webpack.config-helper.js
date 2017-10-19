const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Fs = require('fs');


const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');

// Get pages from filesystem
const EXT_REG = /\.html/;
const PAGES = Fs.readdirSync(Path.resolve(`${__dirname}/src/view`))
  .filter(path => EXT_REG.test(path));

module.exports = (options) => {
  const webpackConfig = {
    devtool: options.devtool,
    entry: {
      pixi: './src/scripts/index.js',
    },
    output: {
      path: Path.join(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development'),
        },
      }),
      new Webpack.ProvidePlugin({}),
      ...PAGES.map(filename => new HtmlWebpackPlugin({
        title: filename.replace(EXT_REG, ''),
        template: `./src/view/${filename}`,
        filename: filename.replace(EXT_REG, '.html'),
      }))
    ],
    resolve: {
      modules: [
        'node_modules',
        Path.resolve(__dirname, 'src'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: 'html-loader',
        }, {
          test: /\.(woff|woff2|ttf|eot)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '../assets/'
            },
          },
        },
      ],
    },
  };

  webpackConfig.plugins.push(
    new Webpack.HotModuleReplacementPlugin()
  );

  webpackConfig.module.rules.push({
    test: /\.scss$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader'],
  });

  webpackConfig.devServer = {
    contentBase: ['./dist', './src/assets/'],
    open: true,
    openPage: PAGES[0].replace(EXT_REG, '.html'),
    hot: true,
    port: options.port,
    inline: true,
  };


  return webpackConfig;
};
