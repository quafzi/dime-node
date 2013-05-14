var Sequelize = require('sequelize');

/* database connection */
var sequelize = new Sequelize('dime', 'root', '');

/* models */
var User      = sequelize.import(__dirname + '/../models/user');
var Service   = sequelize.import(__dirname + '/../models/service');
var Customer  = sequelize.import(__dirname + '/../models/customer');
var Activity  = sequelize.import(__dirname + '/../models/activity');
var Timeslice = sequelize.import(__dirname + '/../models/timeslice');
var Project   = sequelize.import(__dirname + '/../models/project');
var Tag       = sequelize.import(__dirname + '/../models/tag');

/* relations */
Service.hasOne(User).hasMany(Tag);
Project.hasOne(User).hasMany(Tag);
Customer.hasOne(User).hasMany(Project).hasMany(Tag);
Activity.hasOne(User).hasOne(Project).hasOne(Service).hasOne(Customer).hasMany(Tag);
Timeslice.hasOne(Activity).hasMany(Tag);

var Controller = function Controller() { };

Controller.filter = function filter(req) {
  return { where: { user_id: req.userid, id: req.params.id }};
}

Controller.setModel = function setModel(model) {
  Controller.model = model;
};

Controller.models = {
  Service: Service,
  Customer: Customer
};

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

Controller.getModel = function getModel() {
  console.log('no model given?!');
}

/* GET <type> */
Controller.getList = function getList(req, res, next) {
  Controller.getModel().findAll({ where: { user_id: req.userid }})
    .success(function(collection){res.send(collection);});
}

/* GET <type>/id */
Controller.getOne = function getOne(req, res, next) {
  Controller.model.find(Controller.filter(req))
    .success(function(item){res.send(item);});
}

/* POST <type> */
Controller.create = function create(req, res, next) {
  Controller.model
    .build(Controller.mapData(req, true))
    .save()
    .success(function(newItem) {res.send(newItem);})
    .error(function(error) {
      console.log('could not create item: ' + error);
    });
}

/* PUT <type>/:id */
Controller.update = function update(req, res, next) {
  Controller.model
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
  Controller.model.find(Controller.filter(req))
    .success(function(item) {
    service.destroy().success(function() {res.send('');})
  });
}

module.exports = Controller;