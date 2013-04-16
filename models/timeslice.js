module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Timeslice", {
    name:        DataTypes.STRING,
    activity_id: DataTypes.INTEGER,
    started_at:  DataTypes.DATE,
    stopped_at:  DataTypes.DATE,
    duration:    DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'timeslices'
  })
}
