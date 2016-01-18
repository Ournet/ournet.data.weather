'use strict';

require('./db/models');

var utils = require('./utils');
var Promise = utils.Promise;
var _ = utils._;
var db = require('vogels-helpers');
var forecast = require('./forecast');
var zlib = require('zlib');
var internal = {};

Promise.promisifyAll(zlib);

var Service = module.exports = function() {

};

Service.instance = new Service();

/**
 * Forecast by selector
 */
Service.prototype.getForecast = function(selector) {
	return db.access.getItem('WeatherPlaceForecast', selector.id, {
			format: 'json'
		})
		.then(function(report) {
			if (report && report.created > (Date.now() - 1000 * 60 * 60 * 10)) {
				return internal.unzip(report.data);
			}
			return forecast.get(selector)
				.then(function(newreport) {
					if (!newreport) {
						return null;
					}
					internal.gzip(newreport)
						.then(function(data) {
							return db.control.put('WeatherPlaceForecast', {
								id: selector.id,
								data: data,
								created: Date.now()
							}, {
								format: 'json'
							});
						});

					return newreport;
				}).catch(function() {
					return null;
				});
		});
};

Service.prototype.getPlacesForecast = function(params) {
	var self = this;
	var alist = [];
	params.places.forEach(function(place) {
		alist.push(self.getForecast(forecast.formatSelector(place)));
	});

	return Promise.all(alist)
		.then(function(result) {
			var data = [];
			params.places.forEach(function(place, i) {
				if (!result[i] || !result[i].days) {
					return;
				}
				var report = _.find(result[i].days, {
					date: params.date
				});
				if (!report) {
					//console.log('no report date: ', date, result[i], i, place);
					return;
				}

				report = report.times[parseInt(report.times.length / 2)];

				if (!report) {
					//console.log('2 no report date: ', date, report, i, place);
					return;
				}

				data.push({
					place: place,
					weather: report
				});
			});
			if (data.length > 0) {
				data = _.sortBy(data, function(n) {
					return n.place.name;
				});
			}
			return data;
		});
};

internal.unzip = function(data) {
	data = new Buffer(data);
	return zlib.unzipAsync(data).then(function(result) {
		return JSON.parse(result.toString());
	});
};

internal.gzip = function(data) {
	return zlib.gzipAsync(new Buffer(JSON.stringify(data), 'ascii'));
};
