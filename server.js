'use strict';

var SERVER_PORT = 8001;

var fs        = require('fs');
var restify   = require('restify');
var jade      = require('jade');
var mysql     = require('mysql');
var sys       = require('sys');
var Sequelize = require('sequelize');

//var hasher    = require(__dirname + '/helpers/hasher');
var authenticate = require(__dirname + '/helpers/authentication');

/* database connection */
var sequelize = new Sequelize('dime', 'root', '');

/* models */
var User     = sequelize.import(__dirname + '/models/user');
var Service  = sequelize.import(__dirname + '/models/service');
var Customer = sequelize.import(__dirname + '/models/customer');
Service.hasOne(User);
Customer.hasOne(User);

/* set some authentication params */
authenticate.User  = User;
authenticate.Error = restify.NotAuthorizedError;

/* init server */
var server = restify.createServer({
  name: 'dime',
  version: '0.1.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());
server.use(authenticate);

/* controllers */
var services = require(__dirname + '/controllers/service');
services.setModel(Service);
var customers = require(__dirname + '/controllers/customer');
customers.setModel(Customer);

/* routes */
server.get ('/services',     services.getList);
server.get ('/services/:id', services.getOne);
server.post('/services',     services.create);
server.put ('/services/:id', services.update);
server.del ('/services/:id', services.del);

server.get ('/customers',     customers.getList);
server.get ('/customers/:id', customers.getOne);
server.post('/customers',     customers.create);
server.put ('/customers/:id', customers.update);
server.del ('/customers/:id', customers.del);

/* start server */
server.listen(SERVER_PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});

