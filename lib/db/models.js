'use strict';

var vogels = require('vogels-helpers');
var schemas = require('./schemas');
var dailyReportConfig = require('./daily_report_config');

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

exports.WeatherAlarm = vogels.define('Weather_DailyReport', {
	tableName: 'Weather_DailyReports',
	timestamps: false,
	hashKey: 'placeId',
	rangeKey: 'date',
	schema: schemas.DailyReport
}, dailyReportConfig);
