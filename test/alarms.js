'use strict';

process.env.WEATHER_ALARM_WIND_LEVEL_YELLOW = 1;

var Alarm = require('../lib/alarms/alarm');
var findAlarms = require('../lib/alarms/find');
var forecast = require('../lib/forecast');
var assert = require('assert');
// var utils = require('../lib/utils');

var place = {
	name: 'Chisinau',
	id: 618426,
	timezone: 'Europe/Chisinau',
	latitude: 47.0,
	longitude: 28.8,
	country_code: 'md',
	region: { name: 'Chisinau', asciiname: 'Chisinau' },
	asciiname: 'Chisinau',
	alternatenames: 'Chisinau[en];Новые Лангры[ru];Nov.Langry[no]'
};

var selector = forecast.formatSelector(place);
var report;

describe('alarms', function() {
	before(function() {
		return forecast.get(selector)
			.then(function(rep) {
				report = rep;
			});
	});
	it('should find wind alarms', function(done) {

		var alarms = findAlarms(place, report.days[1], {
			types: [Alarm.TYPE.WIND],
			level: Alarm.LEVEL.YELLOW,
			langs: ['ro', 'ru']
		});
		assert.equal(1, alarms.length);
		done();
	});

	it('should find no alarms', function(done) {
		var alarms = findAlarms(place, report.days[1], { types: [] });
		assert.equal(0, alarms.length);
		done();
	});
});
