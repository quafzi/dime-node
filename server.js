'use strict';

var SERVER_PORT = 8001;

var fs      = require('fs');
var restify = require('restify');
var jade    = require('jade');
var mysql   = require('mysql');
var sys     = require('sys');

var Service = require('./services');

// @TODO
var userid = 1;

function sendQueryResult(query, res, filter, singleResult, responseQuery)
{
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    //password : '',
    database : 'dime'
  });
  connection.connect();
  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      throw err;
    }
    if ('function' == typeof(filter)) {
      rows = filter(rows);
    }
    if (responseQuery) {
      return sendQueryResult(
        responseQuery.replace('{{last_insert_id}}', rows.insertId),
        res,
        filter,
        singleResult
      );
    } else if (res) {
      res.send(singleResult ? rows[0] : rows);
    }
  });
  connection.end();
}

function getServiceList(req, res, next) {
  sendQueryResult(
    Service.getFindAllQuery(userid),
    res,
    null,
    false
  );
}

function getService(req, res, next) {
  sendQueryResult(
    Service.getFindOneByIdQuery(userid, req.params.id),
    res,
    null,
    true
  );
}

function createService(req, res, next) {
  sendQueryResult(
    Service.getCreateQuery(userid, req.body),
    res,
    null,
    true,
    Service.getFindOneByIdQuery(userid, '{{last_insert_id}}')
  );
}

function updateService(req, res, next) {
  sendQueryResult(
    Service.getUpdateQuery(userid, req.params.id, req.body),
    res,
    null,
    true,
    Service.getFindOneByIdQuery(userid, req.params.id)
  );
}

function deleteService(req, res, next) {
  sendQueryResult(
    Service.getDeleteQuery(userid, req.params.id),
    res
  );
}

var server = restify.createServer({
  name: 'dime',
  version: '0.1.0'
});
server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

server.get('/services', getServiceList);
server.get('/services/:id', getService);
server.post('/services', createService);
server.put('/services/:id', updateService);
server.del('/services/:id', deleteService);

server.listen(SERVER_PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});

