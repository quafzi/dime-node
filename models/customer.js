module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Customer", {
    name:    DataTypes.STRING,
    alias:   DataTypes.STRING,
    rate:    DataTypes.DECIMAL(10, 2),
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'customers'
  })
}
