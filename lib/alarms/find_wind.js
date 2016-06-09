'use strict';

// var _ = require('../utils')._;
var Alarm = require('./alarm');

var RANGES = [
	{ level: Alarm.LEVEL.YELLOW, range: process.env.WEATHER_ALARM_WIND_LEVEL_YELLOW || 6 },
	{ level: Alarm.LEVEL.ORANGE, range: process.env.WEATHER_ALARM_WIND_LEVEL_ORANGE || 8 },
	{ level: Alarm.LEVEL.RED, range: process.env.WEATHER_ALARM_WIND_LEVEL_RED || 10 }
];

module.exports = function find(place, reportItem, options) {
	if (!reportItem || !reportItem.times || reportItem.times.length === 0) {
		return null;
	}

	options = options || {};
	var alarm;

	reportItem.times.forEach(function(time) {
		for (var i = RANGES.length - 1; i >= 0; i--) {
			if (RANGES[i].range >= time.wind.speed.beaufort) {
				if (!options.level || RANGES[i].level >= options.level) {
					if (!alarm || alarm.value < time.wind.speed.mps) {
						alarm = Alarm.format(place, time, reportItem.date, {
							type: Alarm.TYPE.WIND,
							level: RANGES[i].level,
							value: time.wind.speed.mps,
							symbol: time.symbol.number
						}, options);
						// stop RANGE for
						return;
					}
				}
			}
		}
	});

	return alarm;
};
