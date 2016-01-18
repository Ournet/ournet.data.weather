'use strict';

var vogels = require('vogels-helpers');
var schemas = require('./schemas');

exports.WeatherPlaceForecast = vogels.define('WeatherPlaceForecast', {
	tableName: 'WeatherPlaceForecasts',
	timestamps: false,
	hashKey: 'id',
	schema: schemas.PlaceForecast
});
