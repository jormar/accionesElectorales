var express = require('express'),
  router = express.Router(),
  db = require('../models');

var io;
module.exports = function (app, sio) {
  io = sio;
  app.use('/', router);
};

router.get('/actions', function (req, res, next) {
  db.Action.findAll().then(function(data){
    res.send(data);
  }).catch(function(err){
    var err = new Error(err);
    err.status = 400;
    next(err);
  });
});

router.post('/actions', function (req, res, next) {
  db.Action.create(req.body).then(function(data){
    res.send({ status: "ok" });

    // Emitimos el mensaje a los sockets
    db.Action.findAll().then(function(data){
      io.emit('reloadAll', data);
    }).catch(function(err){ });

  }).catch(function(err){
    var err = new Error(err);
    err.status = 400;
    next(err);
  });
});

router.delete('/actions/all', function (req, res, next) {
  db.Action.destroy({ where: 'true' }).then(function(data){
    res.send({ status: "ok" });

    // Emitimos el mensaje a los sockets
    db.Action.findAll().then(function(data){
      io.emit('reloadAll', data);
    }).catch(function(err){ });

  }).catch(function(err){
    var err = new Error(err);
    err.status = 400;
    next(err);
  });
});
