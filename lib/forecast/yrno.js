/*eslint dot-notation:1*/

'use strict';

var request = require('request');
var parseXml = require('xml2js').parseString;
var utils = require('../utils');
var Promise = utils.Promise;
var internal = {};
var admName = require('./adm_name');

//var WeatherUrlFormat = 'http://www.yr.no/place/{0}/{1}/{2}/forecast.xml';
// var Other = 'Other';

var COUNTRIES = {
	md: 'Moldova',
	ro: 'Romania',
	ru: 'Russia',
	it: 'Italy',
	bg: 'Bulgaria',
	hu: 'Hungary',
	cz: 'Czech_Republic',
	'in': 'India',
	de: 'Germany',
	es: 'Spain',
	pl: 'Poland',
	al: 'Albania'
};

exports.formatSelector = function(place) {
	return {
		id: place.id,
		country: COUNTRIES[place.country_code],
		region: admName(place),
		name: place.name.replace(/ /g, '_'),
		latitude: place.latitude,
		longitude: place.longitude,
		timezone: place.timezone,
		place: place
	};
};

exports.get = function(selector, options) {
	options = options || {};
	var url = internal.formatForecastUrl(selector, options.useid || false);
	return new Promise(function(resolve, reject) {
		request({
			url: url,
			timeout: options.timeout || 3500,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
				Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.8',
				'cache-control': options.refresh ? 'no-cache, no-store, refresh' : null
			},
			gzip: true
		}, function(error, response, body) {
			if (error || response.statusCode >= 400) {
				error = error || new Error(error.message || 'Error on getting weather report');
				error.statusCode = response && response.statusCode || 500;
				return reject(error);
			} else if (!body) {
				return reject(new Error('No body'));
			}

			parseXml(body, function(error2, result) {
				if (error2) {
					return reject(error2);
				}
				result = internal.formatReport(result);
				resolve(result);
			});
		});
	});
};

internal.formatForecastUrl = function(selector, useid) {
	return ['http://www.yr.no/place', selector.country, encodeURIComponent(selector.region), encodeURIComponent(selector.name) + (useid ? ('~' + selector.id) : ''), 'forecast.xml'].join('/');
};

internal.formatReport = function(data) {
	if (!data || !data.weatherdata || !data.weatherdata.forecast) {
		return null;
	}
	data = data.weatherdata;
	var report = {
		// sun: data.sun[0]['$'],
		days: [],
		offset: parseInt(data.location[0].timezone[0]['$'].utcoffsetMinutes),
		timezone: data.location[0].timezone[0]['$'].id
	};
	var pday = new Date(2011, 1, 12, 12);
	var day;
	var cday;

	// timezone offset in milliseconds:
	var offset = report.offset * 60 * 1000;

	pday = utils.formatDate(pday);

	// convert to UTC unix time
	// report.sun.rise = Date.parse(report.sun.rise) - offset;
	// report.sun.set = Date.parse(report.sun.set) - offset;

	data = data.forecast[0].tabular[0].time;
	data.forEach(function(time) {
		var item = time['$'];
		item.period = parseInt(item.period);
		// convert to UTC unix time:
		item.time = Date.parse(item.from) - offset;
		delete item.from;
		delete item.to;
		// item.to = Date.parse(item.to) - offset;

		cday = new Date(item.time + offset);
		// console.log(cday);
		cday = utils.formatUTCDate(cday);
		item.symbol = time.symbol[0]['$'];
		item.symbol.number = parseInt(item.symbol.number);
		item.symbol.numberEx = parseInt(item.symbol.numberEx);
		item.p = time.precipitation[0]['$'];
		item.p.value = parseInt(item.p.value);
		item.wind = {
			dir: time.windDirection[0]['$'],
			speed: time.windSpeed[0]['$']
		};
		item.wind.speed.mps = parseFloat(item.wind.speed.mps);
		item.wind.speed.beaufort = internal.windSpeedToBeaufort(item.wind.speed.mps);

		item.t = time.temperature[0]['$'];
		item.t.value = parseInt(item.t.value);
		item.pressure = time.pressure[0]['$'];
		item.pressure.value = parseFloat(item.pressure.value);

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
};

internal.windSpeedToBeaufort = function(ms) {
	if (ms < 0.3) {
		return 0;
	}
	if (ms < 1.6) {
		return 1;
	}
	if (ms < 3.4) {
		return 2;
	}
	if (ms < 5.5) {
		return 3;
	}
	if (ms < 8.0) {
		return 4;
	}
	if (ms < 10.8) {
		return 5;
	}
	if (ms < 13.9) {
		return 6;
	}

	return 7;
};
