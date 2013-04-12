var Customers = function Customers() {};

Customers.setModel = function setModel(model) {
  Customers.model = model;
}

/* GET customers */
Customers.getList = function getList(req, res, next) {
  Customers.model.findAll({ where: { user_id: req.userid }})
    .success(function(customers){res.send(customers);});
}

/* GET customers/:id */
Customers.getOne = function getOne(req, res, next) {
  Customers.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(customer){res.send(customer);});
}

/* POST customers */
Customers.create = function create(req, res, next) {
  Customers.model
    .build({
      'name':    req.body.name,
      'alias':   req.body.alias,
      'rate':    req.body.rate,
      'user_id': req.userid
    })
    .save()
    .success(function(newCustomer) {res.send(newCustomer);})
    .error(function(error) {
      console.log('could not create customer: ' + error);
    });
}

/* PUT customers/:id */
Customers.update = function update(req, res, next) {
  Customers.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(customer) {
    if ("undefined" != typeof(req.body.name)) {
      customer.name  = req.body.name;
    }
    if ("undefined" != typeof(req.body.alias)) {
      customer.alias = req.body.alias;
    }
    if ("undefined" != typeof(req.body.rate)) {
      customer.rate  = req.body.rate;
    }

    customer
      .save()
      .success(function(updatedCustomer) {res.send(updatedCustomer);})
      .error(function(error) {
        console.log('could not update customer: ' + error);
      });
  });
}

/* DELETE customers/:id */
Customers.del = function del(req, res, next) {
  Customers.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(customer) {
    customer.destroy().success(function() {res.send('ok');})
  });
}

module.exports = Customers;
