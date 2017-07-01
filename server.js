var express = require('express')
var path = require('path')
var app = express()
var port = process.env.PORT || 8080

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

app.use(express.static('dist'))
// handle every other route with index.html, whic h will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(port, function (error) {
  if(error) {
    console.log(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})


