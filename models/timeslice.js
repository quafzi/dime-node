module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Timeslice", {
    name:        DataTypes.STRING,
    activity_id: DataTypes.INTEGER,
    started_at:  DataTypes.DATETIME,
    stopped_at:  DataTypes.DATETIME,
    duration:    DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'timeslices'
  })
}
