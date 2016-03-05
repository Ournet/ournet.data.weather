'use strict';

var utils = require('./utils');
var Promise = utils.Promise;
var getWeather = Promise.promisify(require('metno-client').getWeather);
var helpers = require('./helpers');
var moment = require('moment-timezone');

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

exports.get = function(selector) {
	return getWeather({
			params: {
				lat: selector.lat,
				lon: selector.lon
			},
			request: { timeout: 2000 }
		})
		.then(function(report) {
			return formatWeatherReport(report, selector);
		});
};

exports.formatSelector = function(place, l) {
	var selector = {
		lat: place.latitude,
		lon: place.longitude,
		timezone: place.timezone
	};

	selector.id = helpers.formatForecastId(selector, l);

	return selector;
};
