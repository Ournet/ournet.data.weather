'use strict';

var Joi = require('vogels-helpers').Joi;

exports.Forecast = {
	id: Joi.string().required(),
	data: Joi.string().required(),
	created: Joi.number().integer().required()
};

exports.Alarm = {
	// country:date
	key: Joi.string().regex(/^[A-Z]{2}\d{8}$/).required(),
	// level:type:location
	range: Joi.string().regex(/^\d{2}_\d{2}_/).required(),
	// year:month:day
	// example: 20160610
	date: Joi.number().integer().min(20160610).required(),
	// 10 - wellow,
	// 20 - orange,
	// 30 - red,
	level: Joi.number().valid([10, 20, 30]).required(),
	// 10 - wind
	// 20 - precipitations
	// 30 - temperature
	type: Joi.number().valid([10, 20, 30]).required(),
	// weather symbol
	symbol: Joi.number().integer().min(1).required(),
	// RO, RU, US, CA
	country: Joi.string().uppercase().regex(/^[A-Z]{2}$/).required(),
	// adm1 code
	adm1: Joi.string().trim(),
	lat: Joi.number().required(),
	lng: Joi.number().required(),
	value: Joi.number().required(),
	place: Joi.object().keys({
		id: Joi.number().integer().min(1).required(),
		name: Joi.string().min(1).max(100).required(),
		names: Joi.object({})
			.pattern(/^[a-z]{2}$/, Joi.string().min(1).max(100).required())
			.max(10),
		timezone: Joi.string().required()
	}).required(),
	// json repost for date
	report: Joi.string().required(),
	time: Joi.number().integer().required(),
	createdAt: Joi.number().integer().required()
};

exports.DailyReport = {
	key: Joi.string().trim().required(),
	// year:month:day
	// example: 20160610
	// date: Joi.number().integer().min(20160701).required(),
	// json repost for date
	report: Joi.string().required()
	// createdAt: Joi.number().integer().required()
};
