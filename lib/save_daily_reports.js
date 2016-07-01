'use strict';

var db = require('vogels-helpers');
var utils = require('./utils');
var Promise = utils.Promise;

module.exports = function(report, place) {
	if (place.feature_class !== 'P') {
		return;
	}
	// is important place
	if (~['PPLC', 'PPLA', 'PPLA2'].indexOf(place.feature_code) || place.population >= 10000) {
		var days = report.days.slice(1, 4);
		Promise.each(days, function(day) {
			return db.control.put('Weather_DailyReport', {
				placeId: place.id,
				country: place.country_code,
				date: parseInt(day.date.replace(/-/g, '')),
				report: JSON.stringify(day)
			}, {
				format: 'json'
			}).delay(1000 * 0.4);
		});
	}
};
