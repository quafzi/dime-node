module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Timeslice", {
    activityId: DataTypes.INTEGER,
    startedAt:  DataTypes.DATE,
    stoppedAt:  DataTypes.DATE,
    duration:   DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'timeslices'
  })
}
