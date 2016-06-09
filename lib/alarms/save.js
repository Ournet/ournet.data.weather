'use strict';

require('../db/models');

// var debug = require('debug')('ournet:data:weather:alarms');
var db = require('vogels-helpers');
var Promise = require('../utils').Promise;

module.exports = function save(alarms) {
	return Promise.all(alarms, function(alarm) {
		return db.control.put('WeatherAlarm', alarm, {
			format: 'json'
		});
	});
};
