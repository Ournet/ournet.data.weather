'use strict';

exports.format = function(data) {
	// DATE:TIME_TEMPERATURE_SYMBOL_PRECIPITATIONS_WIND-DIR_WIND-SPEED_PRESSURE|TIME...
	var report = data.date.toString() + ':';

	report += data.times.map(function(item) {
		return [parseInt(item.time / 1000), item.symbol.number, item.p.value, item.wind.dir.code, item.wind.speed.mps, item.pressure.value].join('_');
	}).join('|');

	return report;
};

exports.parse = function(data) {
	var report = {
		date: data.substr(0, 10)
	};

	data = data.substr(11).split(/\|/g);

	report.times = data.map(function(item) {
		var items = item.split(/_/g);
		return {
			time: parseInt(items[0]) * 1000,
			symbol: { number: parseInt(items[1]) },
			p: { value: parseInt(items[2]) },
			wind: {
				dir: {
					code: items[3]
				},
				speed: {
					mps: parseInt(items[4])
				}
			},
			pressure: { value: parseFloat(items[5]) }
		};
	});

	return report;
};
