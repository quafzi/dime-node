module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    username:  DataTypes.STRING,
    email:     DataTypes.STRING,
    salt:      DataTypes.STRING,
    password:  DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname:  DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'users'
  }, {
    instanceMethods: {
      isCurrentUser: function(req) {
        if (this.username = req.authorization.basic.username) {
          // @TODO check password
          return true;
        }
        return false;
      }
    }
  })
}
