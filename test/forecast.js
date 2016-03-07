'use strict';

var forecast = require('../lib/forecast');
var assert = require('assert');

var chisinau = {
	name: 'Chisinau',
	id: 618426,
	timezone: 'Europe/Chisinau',
	latitude: 47.0,
	longitude: 28.8,
	country_code: 'md',
	region: { name: 'Chisinau', asciiname: 'Chisinau' },
	asciiname: 'Chisinau'
};

describe('forecast', function() {
	it('should get weather forecast', function() {
		var selector = forecast.formatSelector(chisinau);
		// console.log(selector);
		return forecast.get(selector)
			.then(function(report) {
				// console.log(report.days);
				assert.ok(report);
			});
	});
});
