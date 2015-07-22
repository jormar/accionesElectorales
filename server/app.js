var express = require('express');

var app = express();

// Socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config/config');
var db = require('./app/models');

require('./config/express')(app, config, io);

db.sequelize
  .sync()
  .then(function () {
    http.listen(config.port);
  }).catch(function (e) {
    throw new Error(e);
  });

// More Socket.io
io.on('connection', function(socket){
  console.log('a user connected');
});
