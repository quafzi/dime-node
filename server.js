'use strict';

var SERVER_PORT = 8001;

var fs        = require('fs');
var restify   = require('restify');
var jade      = require('jade');
var mysql     = require('mysql');
var sys       = require('sys');
var Sequelize = require("sequelize");

// @TODO
var userid = 1;

/* database connection */
var sequelize = new Sequelize('dime', 'root', '');

/* models */
var Service = sequelize.import(__dirname + '/models/service');

/* controllers */
var services = require(__dirname + '/controllers/service');
services.setModel(Service);

/* init server */
var server = restify.createServer({
  name: 'dime',
  version: '0.1.0'
});
server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

/* routes */
server.get ('/services',     services.getList);
server.get ('/services/:id', services.getOne);
server.post('/services',     services.create);
server.put ('/services/:id', services.update);
server.del ('/services/:id', services.del);

/* start server */
server.listen(SERVER_PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});

