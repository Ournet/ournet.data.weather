'use strict';

var Joi = require('vogels-helpers').Joi;

exports.PlaceForecast = {
	id: Joi.number().integer().required(),
	data: Joi.binary().required(),
	created: Joi.number().integer().required()
};
