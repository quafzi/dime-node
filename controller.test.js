var expect  = require('expect.js');
var _       = require('lodash');
var request = require('supertest');

var controller = require('./controller');
var models = require('./models');

var truthyFunc = function() { return true; };
var emptyFunc  = function() {};

describe('controller', function() {
  it('should be able to support all types of models', function (testDone) {
    var expectedModels = {
      activities: "Activity",
      customers:  "Customer",
      projects:   "Project",
      services:   "Service",
      tags:       "Tag",
      timeslices: "Timeslice",
      users:      "User"
    };
    _.each(expectedModels, function(name, model) {
      expect(controller.getModel(model).name).to.eql(name);
    });
    testDone();
  });
  var req = {};
  var res = {};

  it('should provide a getter for all items', function (testDone) {
    var origGetModel = controller.getModel;
    controller.getModel = function(alias) {
      expect(alias).to.eql('foo');
      return {
        findAll: function(filter) {
          expect(filter.where.user_id).to.eql(0815);
          return {
            success: function(callback) {
              callback('yehaa');
            }
          }
        }
      }
    }
    res.send = function(result) {
      expect(result).to.eql('yehaa');
      testDone();
    }
    req.userid = 0815;
    req.params = { model: 'foo' }
    controller.getList(req, res, emptyFunc);
  });

  it('should provide a getter for single items', function (testDone) {
    var origGetModel = controller.getModel;
    controller.getModel = function(alias) {
      expect(alias).to.eql('foo');
      return {
        find: function(filter) {
          expect(filter.where.user_id).to.eql(0815);
          expect(filter.where.id).to.eql(42);
          return {
            success: function(callback) {
              callback('yehaa');
            }
          }
        }
      }
    }
    res.send = function(result) {
      expect(result).to.eql('yehaa');
      testDone();
    }
    req.userid = 0815;
    req.params = { model: 'foo', id: 42 }
    controller.getOne(req, res, emptyFunc);
  });
})
