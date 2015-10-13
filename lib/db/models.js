'use strict';

var core = require('ournet.core');
var Promise = core.Promise;
var Query = require('../../node_modules/vogels/lib/query.js');

Query.prototype.execAsync = Promise.promisify(Query.prototype.exec);

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
