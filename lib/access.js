'use strict';

require('./db/models');

// var debug = require('debug')('ournet:data:weather');
var utils = require('./utils');
var Promise = utils.Promise;
var _ = utils._;
var db = require('vogels-helpers');
var forecast = require('./forecast');
var zlib = require('zlib');
var internal = {};
var alarms = require('./alarms');
var logger = require('./logger');
var saveDailyReports = require('./daily_report/save');
var reportData = require('./report_data');

Promise.promisifyAll(zlib);

var Service = module.exports = function(options) {
	this.options = _.defaults({}, options || {}, { alarms: false, history: false });
};

Service.instance = new Service();

/**
 * Forecast by selector
 */
Service.prototype.getForecast = function(key, selector, options) {
	var serviceOptions = this.options;
	return db.access.getItem('WeatherForecast', key, {
			format: 'json'
		})
		.then(function(report) {
			if (report && report.created > (Date.now() - 1000 * 60 * 60 * 10)) {
				return internal.unzip(report.data);
			}
			return forecast.get(selector, options)
				.then(function(newreport) {
					if (!newreport) {
						return null;
					}
					// save weather report
					internal.gzip(newreport)
						.then(function(data) {
							return db.control.put('WeatherForecast', {
								id: key,
								data: data,
								created: Date.now()
							}, {
								format: 'json'
							});
						});

					if (newreport.days && newreport.days.length > 1) {
						// find and save weather alarms
						if (serviceOptions.alarms === true) {
							try {
								alarms.findAndSave(selector.place, newreport.days[1])
									.timeout(1000 * 3)
									.catch(function(findError) {
										logger.error('Catched Error on getting alarms:' + (findError.message || 'NO MESSAGE'), findError, newreport.days[1], selector);
									});
							} catch (alarmsError) {
								logger.error('Error on getting alarms:' + (alarmsError.message || 'NO MESSAGE'), alarmsError);
							}
						}

						// save daily forecast reports
						if (serviceOptions.history === true) {
							try {
								saveDailyReports(newreport, key);
							} catch (dailyError) {
								logger.error('Error on saving daily report: ' + dailyError.message || 'NO MESSAGE', dailyError);
							}
						}
					}

					return newreport;
				}, function(error) {
					if (error.code !== 'ETIMEDOUT') {
						logger.error('Error on getting forecast', error);
					}
					return null;
				});
		});
};

Service.prototype.getPlacesForecast = function(params) {
	var self = this;
	var alist = [];
	var selector;
	params.places.forEach(function(place) {
		selector = forecast.formatSelector(place);
		alist.push(self.getForecast(selector.key, selector));
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

Service.prototype.getAlarms = function(key, options) {
	return db.access.query('WeatherAlarm',
		_.defaults({ format: 'items' }, options || {}, { key: key }));
};

Service.prototype.getDailyReports = function(keys, options) {
	return db.access.getItems('Weather_DailyReport', keys, _.defaults({ format: 'json' }, options || {}));
};

Service.prototype.getDailyReport = function(key, options) {
	return db.access.getItem('Weather_DailyReport', key, _.defaults({ format: 'json' }, options || {}));
};

internal.unzip = function(data) {
	return reportData.unzip(data);
};

internal.gzip = function(data) {
	return reportData.zip(data);
};
