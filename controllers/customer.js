var Customers = Object.create(require(__dirname + '/base'));
Customers.getModel = function getModel() {
  console.log('try to fetch customers');
  return Customers.models.Customer;
};

module.exports = Customers;
