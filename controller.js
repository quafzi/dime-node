var models    = require('./models');

var Controller = function Controller() { };

Controller.filter = function filter(req) {
  return { where: { user_id: req.userid, id: req.params.id }};
}

Controller.mapData = function mapData(req, force) {
  data = {};
  if (force || "undefined" != typeof(req.body.name)) {
    data.name  = req.body.name;
  }
  if (force || "undefined" != typeof(req.body.alias)) {
    data.alias  = req.body.alias;
  }
  if (force || "undefined" != typeof(req.body.rate)) {
    data.rate  = req.body.rate;
  }
  if (force) {
    data.user_id  = req.userid;
  }
  return data;
}

Controller.getModel = function getModel(alias) {
  switch(alias) {
    case 'activities':
      return models.Activity;
    case 'customers':
      return models.Customer;
    case 'projects':
      return models.Project;
    case 'services':
      return models.Service;
    case 'tags':
      return models.Tag;
    case 'timeslices':
      return models.Timeslice;
    case 'users':
      return models.User;
  }
  throw Error('no model given?!');
}

Controller.getIncludes = function(alias) {
  switch(alias) {
    case 'activities':
      return [ models.Timeslice, models.Customer, models.Project, models.Service ];
    case 'customers':
      return [ models.Activity, models.Project ];
    case 'projects':
      return [ models.Activity, models.Customer ];
//    case 'services':
//      return [ models.Tag ];
    case 'timeslices':
      return [ models.Activity, models.User ];
  }
  return [];
}

/* GET <type> */
Controller.getList = function getList(req, res, next) {
  Controller.getModel(req.params.model)
    .findAll({ where: { user_id: req.userid }, include: Controller.getIncludes(req.params.model) })
    .success(function(collection){res.send(collection);});
}

/* GET <type>/id */
Controller.getOne = function getOne(req, res, next) {
  Controller.getModel(req.params.model)
    .find(Controller.filter(req))
    .success(function(item){res.send(item);});
}

/* POST <type> */
Controller.create = function create(req, res, next) {
  Controller.getModel(req.params.model)
    .build(Controller.mapData(req, true))
    .save()
    .success(function(newItem) {res.send(newItem);})
    .error(function(error) {
      console.log('could not create item: ' + error);
    });
}

/* PUT <type>/:id */
Controller.update = function update(req, res, next) {
  Controller.getModel(req.params.model)
    .find(Controller.filter)
    .success(function(item) {
      Controller
        .mapData(req, false)
        .save()
        .success(function(updatedItem) {res.send(updatedItem);})
        .error(function(error) {
          console.log('could not update item: ' + error);
        });
    });
}

/* DELETE <type>/:id */
Controller.del = function del(req, res, next) {
  Controller.getModel(req.params.model)
    .find(Controller.filter(req))
    .success(function(item) {
      service.destroy().success(function() {res.send('');})
    });
}

module.exports = Controller;
