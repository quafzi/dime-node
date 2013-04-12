var Projects = function Projects() {};

Projects.setModel = function setModel(model) {
  Projects.model = model;
}

/* GET projects */
Projects.getList = function getList(req, res, next) {
  Projects.model.findAll({ where: { user_id: req.userid }})
    .success(function(projects){res.send(projects);});
}

/* GET projects/:id */
Projects.getOne = function getOne(req, res, next) {
  Projects.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(project){res.send(project);});
}

/* POST projects */
Projects.create = function create(req, res, next) {
  Projects.model
    .build({
      'name':        req.body.name,
      'alias':       req.body.alias,
      'rate':        req.body.rate,
      'customer_id': req.body.customer_id,
      'user_id':     req.userid
    })
    .save()
    .success(function(newProject) {res.send(newProject);})
    .error(function(error) {
      console.log('could not create project: ' + error);
    });
}

/* PUT projects/:id */
Projects.update = function update(req, res, next) {
  Projects.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(project) {
    if ("undefined" != typeof(req.body.name)) {
      project.name  = req.body.name;
    }
    if ("undefined" != typeof(req.body.alias)) {
      project.alias = req.body.alias;
    }
    if ("undefined" != typeof(req.body.rate)) {
      project.rate  = req.body.rate;
    }
    if ("undefined" != typeof(req.body.customer_id)) {
      project.customer_id  = req.body.customer_id;
    }

    project
      .save()
      .success(function(updatedProject) {res.send(updatedProject);})
      .error(function(error) {
        console.log('could not update project: ' + error);
      });
  });
}

/* DELETE projects/:id */
Projects.del = function del(req, res, next) {
  Projects.model.find({ where: { user_id: req.userid, id: req.params.id }})
    .success(function(project) {
    project.destroy().success(function() {res.send('ok');})
  });
}

module.exports = Projects;
