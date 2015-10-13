/*eslint dot-notation:1*/

'use strict';

var request = require('request');
var parseXml = require('xml2js').parseString;
var core = require('ournet.core');
var selfutil = require('./util.js');
var Promise = core.Promise;
var forecast = module.exports;
var internal = {};

//var WeatherUrlFormat = 'http://www.yr.no/place/{0}/{1}/{2}/forecast.xml';
var Other = 'Other';
forecast.get = function(selector) {
	var url = internal.formatForecastUrl(selector, true);
	// var date = Date.now();
	//console.log('getting weather', (Date.now() - date));
	return internal.getForecast(url)
		.catch(function(error) {
			//console.log('getting weather 2', (Date.now() - date));
			if (selector.region !== Other) {
				//console.log('getting weather 3', (Date.now() - date));
				return internal.getForecast(url, 3000, true)
					.catch(function() {
						//console.log('getting weather 4', (Date.now() - date));
						selector.region = Other;
						url = internal.formatForecastUrl(selector, true);
						return internal.getForecast(url, 1500);
					});
			}
			return Promise.reject(error);
		});
};

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

forecast.formatSelector = function(place) {
	return {
		id: place.id,
		country: COUNTRIES[place.country_code],
		region: selfutil.weatherAdmName(place),
		name: place.name.replace(/ /g, '_')
	};
};


internal.getForecast = function(url, timeout, refresh) {
	// var date = Date.now();
	//console.log('getting url: ', url);
	return new Promise(function(resolve, reject) {
		request({
			url: url,
			timeout: timeout || 3500,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
				Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.8',
				'cache-control': refresh ? 'no-cache, no-store, refresh' : null
			},
			gzip: true
		}, function(error, response, body) {
			if (error || response.statusCode >= 400) {
				return reject(error || new (core.errors['Http' + response.statusCode + 'Error'])({
					statusCode: response.statusCode,
					message: response.message || 'Error on getting weather report',
					explanation: url
				}));
			}

			//console.log('got report in ', (Date.now() - date), 'ms');
			//date = Date.now();
			//console.log('body: ', body, response.statusCode);
			//console.log('parsing...');
			parseXml(body, function(error2, result) {
				//console.log('parsed report in ', (Date.now() - date), 'ms');
				//console.log('parsed:', result);
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
			sun: data.sun[0]['$'],
			days: []
			//tabular: data.forecast[0].tabular
		},
		pday = new Date(2011, 1, 12, 12),
		day, cday;
	pday = core.util.formatDate(pday);

	report.sun.rise = Date.parse(report.sun.rise);
	report.sun.set = Date.parse(report.sun.set);
	data = data.forecast[0].tabular[0].time;
	data.forEach(function(time) {
		var item = time['$'];
		item.period = parseInt(item.period);
		//console.log('from=', item.from);
		item.from = Date.parse(item.from);
		item.to = Date.parse(item.to);
		cday = new Date(item.from);
		//cday.setTimezone(Date.timezone);
		//console.log('cday=', cday, cday.getHours());
		//cday.setHours(cday.getHours() + 1);
		cday = core.util.formatDate(cday);
		//console.log('cday=', cday);
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
