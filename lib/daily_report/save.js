'use strict';

var db = require('vogels-helpers');
var utils = require('../utils');
var Promise = utils.Promise;
var helpers = require('../helpers');
var Report = require('./report');

module.exports = function(report, key) {
	var days = report.days.slice(1, 4);
	Promise.each(days, function(day) {
		return db.control.put('Weather_DailyReport', {
			key: helpers.formatDailyReportKey(key, day.date),
			date: parseInt(day.date.replace(/-/g, '')),
			report: Report.format(day)
		}, {
			format: 'json'
		}).delay(1000 * 0.4);
	});
};
