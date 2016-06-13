'use strict';

var _ = require('../utils')._;
var helpers = require('../helpers');

exports.LEVEL = {
	YELLOW: 10,
	ORANGE: 20,
	RED: 30
};

exports.TYPE = {
	WIND: 10
};

exports.format = function format(place, time, date, data, options) {
	var alarm = {
		place: {
			id: place.id,
			name: place.name,
			timezone: place.timezone
		},
		lat: place.latitude,
		lng: place.longitude,
		country: place.country_code,
		adm1: place.admin1_code,
		date: parseInt(date.replace(/-/g, '')),
		report: JSON.stringify(time),
		time: time.time,
		createdAt: Date.now()
	};
	alarm = _.assign(alarm, data);

	alarm.key = helpers.formatAlarmKey(alarm.country, alarm.date);
	alarm.range = helpers.formatAlarmRangeKey(alarm.level, alarm.type, alarm);

	options = options || {};

	if (place.alternatenames) {
		alarm.place.names = {};
		var names = place.alternatenames.split(/;/g);
		names.forEach(function(name) {
			if (!name || name.length < 5) {
				return;
			}
			var lang = name.substr(name.length - 3, 2);
			if (options.langs && options.langs.indexOf(lang) < 0) {
				return;
			}
			name = name.substr(0, name.length - 4);
			if (name !== place.name) {
				alarm.place.names[lang] = name;
			}
		});
	}

	return alarm;
};
