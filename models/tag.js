module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Tag", {
    name:    DataTypes.STRING
  }, {
    underscored: true,
    tableName: 'tags'
  })
}
