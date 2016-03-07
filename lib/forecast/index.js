'use strict';

var metno = require('./metno');
var yrno = require('./yrno');
var helpers = require('../helpers');

exports.get = function(selector) {
	// var options = {
	// 	timeout: process.env.WEATHER_CLIENT_TIMEOUT || 3000
	// };

	return yrno.get(selector, { timeout: 2000 })
		.catch(function() {
			return metno.get(selector, { timeout: 5000 });
		});
};

exports.formatSelector = function(place) {
	var selector = yrno.formatSelector(place);

	selector.key = helpers.formatForecastKey(place);

	return selector;
};
