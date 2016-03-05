'use strict';

var forecast = require('../lib/forecast');
var assert = require('assert');

var chisinau = { timezone: 'Europe/Chisinau', latitude: 47.0, longitude: 28.8 };

describe('forecast', function() {
	it('should get weather forecast', function() {
		return forecast.get(forecast.formatSelector(chisinau))
			.then(function(report) {
				// console.log(report.days[1].times);
				assert.ok(report);
			});
	});
});
