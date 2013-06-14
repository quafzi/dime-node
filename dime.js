'use strict';

var SERVER_PORT = 8001;

var restify   = require('restify');
//var fs        = require('fs');
//var jade      = require('jade');
//var mysql     = require('mysql');
//var sys       = require('sys');
//var util      = require('util');

var models    = require('./models');

/* set some authentication params */
var authenticate = require('./helpers/authentication');
authenticate.User  = models.User;
authenticate.Error = restify.NotAuthorizedError;

/* init server */
var Server = restify.createServer({
  name:    'dime',
  version: '0.1.0'
});
Server.use(restify.acceptParser(Server.acceptable));
Server.use(restify.queryParser());
Server.use(restify.bodyParser());
Server.use(restify.authorizationParser());
Server.use(authenticate);

/* controllers */
var Controller = require('./controller');

/* routes */
Server.get ('/:model',     Controller.getList);
Server.get ('/:model/:id', Controller.getOne);
Server.post('/:model',     Controller.create);
Server.put ('/:model/:id', Controller.update);
Server.del ('/:model/:id', Controller.del);

/* start server */
Server.listen(SERVER_PORT, function() {
  console.log('%s listening at %s', Server.name, Server.url);
});

