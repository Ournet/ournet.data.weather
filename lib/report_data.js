'use strict';

var utils = require('./utils');
var Promise = utils.Promise;
var zlib = require('zlib');

var internal = {};

Promise.promisifyAll(zlib);

exports.unzip = function(data) {
	if (typeof data === 'string') {
		data = JSON.parse(data);
		if (data._v) {
			data = internal.uncompressReport(data);
		}
		return Promise.resolve(data);
	}
	data = new Buffer(data);
	return zlib.unzipAsync(data).then(function(result) {
		return JSON.parse(result.toString());
	});
};

exports.zip = function(data) {
	return Promise.resolve(internal.compressReport(data));
	// return zlib.gzipAsync(new Buffer(JSON.stringify(data), 'ascii'));
};

internal.compressReport = function(data) {
	var report = {
		_v: 1,
		v: {
			ds: [],
			tz: data.timezone
		}
	};

	var day;
	var item;
	var time;
	var t;

	for (var i = 0; i < data.days.length; i++) {
		day = data.days[i];
		item = {
			d: day.date,
			t: []
		};
		for (var j = 0; j < day.times.length; j++) {
			time = day.times[j];
			t = {
				d: time.time / 1000,
				s: time.symbol.number,
				wd: time.wind.dir.code,
				wsm: time.wind.speed.mps,
				wsb: time.wind.speed.beaufort,
				t: time.t.value,
				p: time.pressure && time.pressure.value,
				h: time.humidity && time.humidity.percent,
				c: time.cloudiness && time.cloudiness.percent,
				f: time.fog.percent
			};
			item.t.push(t);
		}

		report.v.ds.push(item);
	}

	return JSON.stringify(report);
};

internal.uncompressReport = function(data) {
	data = data.v;

	var report = {
		days: [],
		timezone: data.tz
	};

	var day;
	var item;
	var time;
	var t;

	for (var i = 0; i < data.ds.length; i++) {
		day = data.ds[i];
		item = {
			date: day.d,
			times: []
		};
		for (var j = 0; j < day.t.length; j++) {
			time = day.t[j];
			t = {
				time: time.d * 1000,
				symbol: { number: time.s },
				wind: {
					dir: { code: time.wd },
					speed: {
						mps: time.wsm,
						beaufort: time.wsb
					}
				},
				t: { unit: 'celsius', value: time.t },
				pressure: {
					unit: 'hPa',
					value: time.p
				},
				humidity: { percent: time.h },
				cloudiness: { percent: time.c },
				fog: { percent: time.f }
			};
			item.times.push(t);
		}

		report.days.push(item);
	}

	return report;
};
