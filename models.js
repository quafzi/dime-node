'use strict';

var Sequelize = require('sequelize');

/* database connection */
var sequelize = new Sequelize('dime', 'root', '');

var Activity = sequelize.define("Activity", {
  name:        Sequelize.STRING,
  alias:       Sequelize.STRING,
  rate:        Sequelize.DECIMAL(10, 2),
  user_id:     Sequelize.INTEGER,
  customer_id: Sequelize.INTEGER,
  project_id:  Sequelize.INTEGER,
  service_id:  Sequelize.INTEGER
}, {
  underscored: true,
  tableName: 'activities'
});

var Customer = sequelize.define("Customer", {
  name:    Sequelize.STRING,
  alias:   Sequelize.STRING,
  rate:    Sequelize.DECIMAL(10, 2),
  user_id: Sequelize.INTEGER
}, {
  underscored: true,
  tableName: 'customers'
});

var Project = sequelize.define("Project", {
  name:        Sequelize.STRING,
  alias:       Sequelize.STRING,
  rate:        Sequelize.DECIMAL(10, 2),
  user_id:     Sequelize.INTEGER,
  customer_id: Sequelize.INTEGER
}, {
  underscored: true,
  tableName: 'projects'
});

var Service = sequelize.define("Service", {
  name:    Sequelize.STRING,
  alias:   Sequelize.STRING,
  rate:    Sequelize.DECIMAL(10, 2),
  user_id: Sequelize.INTEGER
}, {
  underscored: true,
  tableName: 'services'
})
var Tag = sequelize.define("Tag", {
  name:    Sequelize.STRING
}, {
  underscored: true,
  tableName: 'tags'
})
var Timeslice = sequelize.define("Timeslice", {
  name:        Sequelize.STRING,
  activity_id: Sequelize.INTEGER,
  started_at:  Sequelize.DATE,
  stopped_at:  Sequelize.DATE,
  duration:    Sequelize.INTEGER
}, {
  underscored: true,
  tableName: 'timeslices'
});

var Setting = sequelize.define("Setting", {
  name:      Sequelize.STRING,
  namespace: Sequelize.STRING,
  value:     Sequelize.STRING,
}, {
  underscored: true,
  tableName: 'settings'
});

var User = sequelize.define("User", {
  username:  Sequelize.STRING,
  email:     Sequelize.STRING,
  salt:      Sequelize.STRING,
  password:  Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname:  Sequelize.STRING
}, {
  underscored: true,
  tableName: 'users'
}, {
  isCurrentUser: function(req) {
    if (this.username = req.authorization.basic.username) {
      // @TODO check password
      return true;
    }
    return false;
  }
})

Activity
  .belongsTo(Customer)
  .belongsTo(Project)
  .belongsTo(Service)
  //.hasMany(Tag, {joinTableName: "activity_tags"})
  .hasMany(Timeslice)
  .belongsTo(User);
Customer
  .hasMany(Activity)
  .hasMany(Project)
  //.hasMany(Tag, {joinTableName: "customer_tags"})
  .belongsTo(User);
Service
  //.hasMany(Tag, {joinTableName: "service_tags"})
  .belongsTo(User);
Setting
  .belongsTo(User);
Project
  .hasMany(Activity)
  .belongsTo(Customer)
  //.hasMany(Tag, {joinTableName: "project_tags"})
  .belongsTo(User);
  /*
Tag
  .hasMany(Activity,  {joinTableName: "activity_tags"})
  .hasMany(Customer,  {joinTableName: "customer_tags"})
  .hasMany(Project,   {joinTableName: "project_tags"})
  .hasMany(Service,   {joinTableName: "service_tags"})
  .hasMany(Timeslice, {joinTableName: "timeslice_tags"})
  .belongsTo(User);
  */
Timeslice
  .belongsTo(Activity)
  //.hasMany(Tag, {joinTableName: "timeslice_tags"})
  .belongsTo(User);
User
  .hasMany(Activity)
  .hasMany(Customer)
  .hasMany(Service)
  .hasMany(Setting)
  .hasMany(Project)
  .hasMany(Timeslice);

module.exports = {
  Activity:  Activity,
  Customer:  Customer,
  Project:   Project,
  Service:   Service,
  Setting:   Setting,
  Tag:       Tag,
  Timeslice: Timeslice,
  User:      User
}
