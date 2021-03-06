'use strict';

process.env.WEATHER_ALARM_WIND_LEVEL_YELLOW = 1;
process.env.WEATHER_ALARM_PRECIPITATION_LEVEL_YELLOW = 1;

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
	it('should find wind alarms', function() {
		report.days[1].times[0].p.value = 2;
		report.days[1].times[1].p.value = 20;
		return findAlarms(place, report.days[1], {
			types: [Alarm.TYPE.WIND, Alarm.TYPE.PRECIPITATION],
			level: Alarm.LEVEL.YELLOW,
			langs: ['ro', 'ru']
		}).then(function(alarms) {
			// console.log(alarms)
			assert.equal(2, alarms.length);
		});
	});

	it('should find no alarms', function() {
		return findAlarms(place, report.days[1], { types: [] })
			.then(function(alarms) {
				assert.equal(0, alarms.length);
			});
	});
});
