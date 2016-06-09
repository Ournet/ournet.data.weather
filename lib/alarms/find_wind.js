'use strict';

// var _ = require('../utils')._;
var Alarm = require('./alarm');

var RANGES = [
	{ level: Alarm.LEVEL.YELLOW, range: [5, 6] },
	{ level: Alarm.LEVEL.ORANGE, range: [7, 8] },
	{ level: Alarm.LEVEL.RED, range: [9, 10, 11, 12] }
];

module.exports = function find(place, reportItem, options) {
	if (!reportItem || !reportItem.times || reportItem.times.length === 0) {
		return null;
	}

	options = options || {};
	var alarm;

	reportItem.times.forEach(function(time) {
		for (var i = RANGES.length - 1; i >= 0; i--) {
			if (~RANGES[i].range.indexOf(time.wind.speed.beaufort)) {
				if (!options.level || RANGES[i].level >= options.level) {
					if (!alarm || alarm.value < time.wind.speed.mps) {
						alarm = Alarm.format(place, time, reportItem.date, {
							type: Alarm.TYPE.WIND,
							level: RANGES[i].level,
							value: time.wind.speed.mps,
							symbol: time.symbol.number
						}, options);
					}
				}
			}
		}
	});

	return alarm;
};
