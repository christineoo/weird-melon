var path = require('path');
var webpack = require('webpack');
const config = require('./config');

module.exports = {
  devTools: 'source-map',

  entry: getEntrySources([
    './src/index.js',
    './src/index.html'
  ]),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
            __API_KEY__: `'${config.apiKey}'`,
            __AUTH_DOMAIN__: `'${config.authDomain}'`,
            __DATABASE_URL__: `'${config.databaseURL}'`,
            __STORAGE_BUCKET__: `'${config.storageBucket}'`,
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
    },
    {
        test: /\.scss$/,
        loaders: [
            'style', 'css?sourceMap', 'sass?sourceMap'
        ]
    },
    {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
    },
    {
        test: /\.json$/,
        loader: 'json'
    }
    ]
  }
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}