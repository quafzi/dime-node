var Services = function Services() {};

/* GET services */
Services.getList = function getList(req, res, next) {
  Services.model.findAll({ where: { user_id: req.userid }})
    .success(function(services){res.send(services);});
}

/* GET services/:id */
Services.getOne = function getOne(req, res, next) {
  Services.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(service){res.send(service);});
}

/* POST services */
Services.create = function create(req, res, next) {
  Services.model
    .build({
      'name':    req.body.name,
      'alias':   req.body.alias,
      'rate':    req.body.rate,
      'user_id': req.userid
    })
    .save()
    .success(function(newService) {res.send(newService);})
    .error(function(error) {
      console.log('could not create service: ' + error);
    });
}

/* PUT services/:id */
Services.update = function update(req, res, next) {
  Services.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(service) {
    if ("undefined" != typeof(req.body.name)) {
      service.name  = req.body.name;
    }
    if ("undefined" != typeof(req.body.alias)) {
      service.alias = req.body.alias;
    }
    if ("undefined" != typeof(req.body.rate)) {
      service.rate  = req.body.rate;
    }

    service
      .save()
      .success(function(updatedService) {res.send(updatedService);})
      .error(function(error) {
        console.log('could not update service: ' + error);
      });
  });
}

/* DELETE services/:id */
Services.del = function del(req, res, next) {
  Services.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(service) {
    service.destroy().success(function() {res.send('');})
  });
}

module.exports = Services;
