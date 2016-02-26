/*eslint handle-callback-err:1*/
'use strict';

var forecast = require('../lib/forecast');
var assert = require('assert');

describe('forecast', function() {
	it('should get weather forecast', function() {
		return forecast.get({ id: 618426, country: 'Moldova', region: 'Chisinau', name: 'Chisinau' })
			.then(function(report) {
				// console.log(report.days[0].times[0].wind);
				assert.ok(report);
			});
	});
});
