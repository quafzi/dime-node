var Activities = require(__dirname + '/base');

Activities.superMapData = Activities.mapData;
Activities.mapData = function mapData(req. force) {
  data = Activities.superMapData(req, force);
  if (force || "undefined" != typeof(req.body.rate_reference)) {
    data.rate_reference  = req.body.rate_reference;
  }
  return data;
}

module.exports = Activities;
