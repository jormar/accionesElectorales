var express = require('express');
var glob = require('glob');

// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config, io) {
  // app.set('views', config.root + '/app/views');
  // app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(compress());
  // app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(function allowCorsHtml5(req, res, next){
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-methods', 'GET, POST, DELETE');
    res.set('access-control-allow-headers', 'Content-Type');
    next();
  });

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, io);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    err.status = err.status || 500;

    var result = {
        errcode: err.status,
        msg: err.message,
    };

    res.send(result);
  });

};
