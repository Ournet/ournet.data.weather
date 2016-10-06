'use strict';

var utils = require('../utils');
var _ = utils._;
var Alarm = require('./alarm');

var RANGES = [
	{ level: Alarm.LEVEL.YELLOW, range: process.env.WEATHER_ALARM_PRECIPITATION_LEVEL_YELLOW || 10 },
	{ level: Alarm.LEVEL.ORANGE, range: process.env.WEATHER_ALARM_PRECIPITATION_LEVEL_ORANGE || 20 },
	{ level: Alarm.LEVEL.RED, range: process.env.WEATHER_ALARM_PRECIPITATION_LEVEL_RED || 30 }
];

module.exports = function find(place, reportItem, options) {
	if (!reportItem || !reportItem.times || reportItem.times.length === 0) {
		return null;
	}

	options = options || {};

	var precipValue = reportItem.times.reduce(function(previousValue, time) {
		return previousValue + (time.p && time.p.value || 0);
	}, 0);

	if (precipValue < 1) {
		return null;
	}

	var time = _.maxBy(reportItem.times, function(o) {
		return o.p.value;
	});


	for (var i = RANGES.length - 1; i >= 0; i--) {
		if (RANGES[i].range <= precipValue) {
			if (!options.level || RANGES[i].level >= options.level) {
				return Alarm.format(place, time, reportItem.date, {
					type: Alarm.TYPE.PRECIPITATION,
					level: RANGES[i].level,
					value: precipValue,
					symbol: time.symbol.number
				}, options);
			}
		}
	}

	return null;
};
