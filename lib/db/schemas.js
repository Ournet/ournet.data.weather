'use strict';

var Joi = require('vogels-helpers').Joi;

exports.Forecast = {
	id: Joi.string().required(),
	data: Joi.binary().required(),
	created: Joi.number().integer().required()
};
