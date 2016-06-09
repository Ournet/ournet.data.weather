'use strict';

var Alarm = require('./alarm');
var debug = require('debug')('ournet:data:weather:alarms');
var finders = [
	{ type: Alarm.TYPE.WIND, find: require('./find_wind') }
];

module.exports = function find(place, reportItem, options) {
	var alarms = [];
	var alarm;

	options = options || {};
	finders.forEach(function(finder) {
		if (!options.types || ~options.types.indexOf(finder.type)) {
			alarm = finder.find(place, reportItem, options);
			if (alarm) {
				alarms.push(alarm);
			}
		}
	});
	if (alarms.length > 0) {
		debug('found %d alarms', alarms.length);
	}
	return alarms;
};