'use strict';

require('../db/models');

var debug = require('debug')('ournet:data:weather:alarms');
var db = require('vogels-helpers');
var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
var logger = require('../logger');


module.exports = function save(alarms) {
	return Promise.each(alarms, function(alarm) {
		var info = _.pick(alarm, ['level', 'type', 'place']);
		debug('saving alarm', info);
		return db.control.put('WeatherAlarm', alarm, {
				format: 'json'
			})
			.then(function() {
				debug('saved alarm', info);
			}, function(error) {
				logger.error('Error on saving alarm', error, info);
			});
	});
};
