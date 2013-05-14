var Services = Object.create(require(__dirname + '/base'));
Services.getModel = function getModel() {
  console.log('try to fetch services');
  return Services.models.Service;
};

module.exports = Services;
