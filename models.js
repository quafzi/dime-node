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
})
var Customer = sequelize.define("Customer", {
  name:    Sequelize.STRING,
  alias:   Sequelize.STRING,
  rate:    Sequelize.DECIMAL(10, 2),
  user_id: Sequelize.INTEGER
}, {
  underscored: true,
  tableName: 'customers'
})
var Project = sequelize.define("Project", {
  name:        Sequelize.STRING,
  alias:       Sequelize.STRING,
  rate:        Sequelize.DECIMAL(10, 2),
  user_id:     Sequelize.INTEGER,
  customer_id: Sequelize.INTEGER
}, {
  underscored: true,
  tableName: 'projects'
})
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
})
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

Service
  .hasOne(User)
  .hasMany(Tag);
Project
  .hasOne(User)
  .hasMany(Tag);
Customer
  .hasOne(User)
  .hasMany(Project)
  .hasMany(Tag);
Activity
  .hasOne(User)
  .hasOne(Project)
  .hasOne(Service)
  .hasOne(Customer)
  .hasMany(Tag);
Timeslice
  .hasOne(Activity)
  .hasMany(Tag);

module.exports = {
  Activity:  Activity,
  Service:   Service,
  Project:   Project,
  Customer:  Customer,
  Timeslice: Timeslice,
  Tag:       Tag,
  User:      User
}
