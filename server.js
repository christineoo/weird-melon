var express = require('express')

var app = express()

if (process.env.NODE_ENV !== 'production') {
  var config = require('./webpack.config.js')
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var compiler = webpack(config)

  console.log('lala: ', config)
  app.use(
    webpackDevMiddleware(compiler, {
      quite: true,
      publicPath: config.output.publicPath
    })
  )
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static('public'))

var port = 8080

app.listen(port, function (error) {
  if(error) {
    console.log(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})


