'use strict';

var core = require('ournet.core');
var Promise = core.Promise;
var _ = core._;
var zlib = require('zlib');
var models = require('./models');
var forecast = require('../forecast.js');
var internal = {};

core.Promise.promisifyAll(zlib);

var Service = module.exports = function() {

};

Service.instance = new Service();

/**
 * Forecast by selector
 */
Service.prototype.getForecast = function(selector) {
	return models.WeatherPlaceForecast.getAsync(selector.id).then(function(report) {
		report = internal.get(report);
		if (report && report.created > (Date.now() - 1000 * 60 * 60 * 10)) {
			//console.log(new Date(report.created));
			return internal.unzip(report.data);
		}
		return forecast.get(selector).then(function(newreport) {
			if (!newreport) {
				return null;
			}
			internal.gzip(newreport).then(function(data) {
				return models.WeatherPlaceForecast.createAsync({
					id: selector.id,
					data: data,
					created: Date.now()
				});
			});

			return newreport;
		}).catch(function() {
			return null;
		});
	});
};

Service.prototype.getPlacesForecast = function(params) {
	var alist = [];
	params.places.forEach(function(place) {
		alist.push(Service.prototype.getForecast(forecast.formatSelector(place)));
	});

	return Promise.all(alist).then(function(result) {
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
	//var date = Date.now();
	return zlib.unzipAsync(data).then(function(result) {
		//console.log('unziped in ', (Date.now() - date), 'ms');
		return JSON.parse(result.toString());
	});
};

internal.gzip = function(data) {
	return zlib.gzipAsync(new Buffer(JSON.stringify(data), 'ascii'));
};

internal.get = function(data) {
	if (_.isNull(data) || _.isUndefined(data)) {
		return data;
	}
	if (_.isArray(data)) {
		return data.map(internal.get);
	}
	if (_.isFunction(data.toJSON)) {
		return data.toJSON();
	}
	if (_.isObject(data)) {
		Object.keys(data).forEach(function(key) {
			data[key] = internal.get(data[key]);
		});
	}
	return data;
};
