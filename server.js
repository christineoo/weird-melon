var express = require('express')

var app = express()
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require("webpack-dashboard/plugin")

var dashboard = new Dashboard()

if (process.env.NODE_ENV !== 'production') {
  var config = require('./webpack.config.js')
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var compiler = webpack(config)

  compiler.apply(new DashboardPlugin(dashboard.setData));

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


