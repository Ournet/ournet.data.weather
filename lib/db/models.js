'use strict';

var vogels = require('vogels-helpers');
var schemas = require('./schemas');

exports.WeatherForecast = vogels.define('WeatherForecast', {
	tableName: 'WeatherForecasts',
	timestamps: false,
	hashKey: 'id',
	schema: schemas.Forecast
});

exports.WeatherAlarm = vogels.define('WeatherAlarm', {
	tableName: 'WeatherAlarms',
	timestamps: false,
	hashKey: 'key',
	rangeKey: 'range',
	schema: schemas.Alarm
});
