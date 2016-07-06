'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var Alarm = require('./alarm');
var debug = require('debug')('ournet:data:weather:alarms');

var finders = [
	{ type: Alarm.TYPE.WIND, find: require('./find_wind') },
	{ type: Alarm.TYPE.PRECIPITATION, find: require('./find_precipitation') }
];

module.exports = function find(place, reportItem, options) {
	var alarms = [];
	var alarm;
	options = options || {};

	return new Promise(function(resolve) {
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
		resolve(alarms);
	});
};
