'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var getWeather = Promise.promisify(require('metno-client').getWeather);
var helpers = require('../helpers');

function formatWeatherReport(data, selector) {
	var report = {
		days: [],
		timezone: selector.timezone
	};
	var pday = new Date(2011, 1, 12, 12);
	var day;
	var cday;

	pday = utils.formatDate(pday);

	data.times.forEach(function(time) {
		var item = { time: time.time };
		cday = new Date(item.time);
		cday = utils.formatUTCDate(cday);
		item.symbol = time.symbol;
		// item.p = time.precipitation;
		// item.p.value = parseInt(item.p.value);
		item.wind = {
			dir: { code: time.windDirection.name },
			speed: { mps: time.windSpeed.mps, beaufort: time.windSpeed.beaufort }
		};

		item.t = time.temperature;
		item.t.value = parseInt(item.t.value);
		item.pressure = time.pressure;
		item.humidity = { percent: time.humidity.value };
		item.cloudiness = time.cloudiness;
		item.fog = time.fog;

		if (cday !== pday) {
			day = {
				date: cday,
				times: []
			};
			report.days.push(day);
			pday = cday;
		}
		day.times.push(item);
	});
	return report;
}

exports.get = function(selector, options) {
	options = options || {};
	return getWeather({
			params: {
				lat: selector.latitude,
				lon: selector.longitude
			},
			request: {
				timeout: options.timeout || 4000,
				gzip: true
			}
		})
		.then(function(report) {
			return formatWeatherReport(report, selector);
		});
};

exports.formatSelector = function(place) {
	var selector = {
		latitude: place.latitude,
		longitude: place.longitude,
		timezone: place.timezone,
		id: place.id
	};

	selector.key = helpers.formatForecastKey(place);

	return selector;
};
