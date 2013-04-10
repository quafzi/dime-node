'use strict';

var Service = function Service() {
}

Service.publicFields = [
  'id',
  'name',
  'alias',
  'rate',
  'created_at',
  'updated_at'
];
Service.table = 'services';

Service.getFindAllQuery = function getFindAllQuery(userid) {
  return 'SELECT ' + this.publicFields.toString() + ' FROM ' + this.table
    + ' WHERE user_id='+ userid;
};

Service.getFindOneByIdQuery = function getFindOneByIdQuery(userid, id) {
  return 'SELECT ' + this.publicFields.toString() + ' FROM ' + this.table
    + ' WHERE id=' + id + ' AND user_id=' + userid;
};

Service.getCreateQuery = function getCreateQuery(userid, data) {
  var query = 'INSERT INTO ' + this.table + ' SET user_id=' + userid
    + ', created_at=NOW()'
    + ', updated_at=NOW()';
  for (var i = 0; i < this.publicFields.length; i++) {
    if (data[this.publicFields[i]]) {
      query += ', ' + this.publicFields[i] + '="'
        + data[this.publicFields[i]] + '"';
    }
  }
  return query;
};

Service.getUpdateQuery = function getUpdateQuery(userid, id, data) {
  var query = 'UPDATE ' + this.table + ' SET updated_at=NOW()';
  for (var i = 0; i < this.publicFields.length; i++) {
    if (data[this.publicFields[i]]) {
      query += ', ' + this.publicFields[i] + '="'
        + data[this.publicFields[i]] + '"';
    }
  }
  return query + ' WHERE user_id=' + userid + ' AND id=' + id;
};

Service.getDeleteQuery = function getDeleteQuery(userid, id) {
  return 'DELETE FROM ' + this.table
    + ' WHERE id=' + id + ' AND user_id=' + userid;
};

module.exports = Service;
