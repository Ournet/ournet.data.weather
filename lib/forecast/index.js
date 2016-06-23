'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var _ = utils._;
var metno = require('./metno');
var yrno = require('./yrno');
var helpers = require('../helpers');
var logger = require('../logger');

function recallOtherYr(selector, error) {
	if (~[404, 500].indexOf(error.statusCode) && selector.region !== 'Other') {
		selector.region = 'Other';
		return yrno.get(selector, { timeout: 2000, useid: true });
	}
	return Promise.reject(error);
}

exports.get = function(selector, options) {
	// var options = {
	// 	timeout: process.env.WEATHER_CLIENT_TIMEOUT || 3000
	// };
	options = _.defaults(options || {}, { timeout: 2000 });

	return yrno.get(selector, options)
		.catch(function(error) {
			return recallOtherYr(selector, error)
				.catch(function(error2) {
					logger.error('Yrno error:' + error2.message, error2);
					return metno.get(selector, { timeout: 1000 });
				});
		});
};

exports.formatSelector = function(place) {
	var selector = yrno.formatSelector(place);

	selector.key = helpers.formatForecastKey(place);

	return selector;
};
