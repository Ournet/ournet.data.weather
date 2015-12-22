'use strict';

var core = require('ournet.core');
var Promise = core.Promise;

var vogels = require('vogels');
var Joi = require('joi');
var models = module.exports;

models.WeatherPlaceForecast = vogels.define('WeatherPlaceForecast', {
	tableName: 'WeatherPlaceForecasts',
	hashKey: 'id',
	schema: {
		id: Joi.number().integer().required(),
		data: Joi.binary().required(),
		created: Joi.number().integer().required()
	}
});

Promise.promisifyAll(models.WeatherPlaceForecast);
