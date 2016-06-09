'use strict';

var Alarm = require('./alarm');

var finders = [
	{ type: Alarm.TYPE.WIND, find: require('./find_wind') }
];

module.exports = function find(place, reportItem, options) {
	var alarms = [];
	options = options || {};
	finders.forEach(function(finder) {
		if (!options.types || ~options.types.indexOf(finder.type)) {
			alarms = alarms.concat(finder.find(place, reportItem, options));
		}
	});
	return alarms;
};
