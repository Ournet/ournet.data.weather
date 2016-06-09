'use strict';

var find = exports.find = require('./find');
var save = exports.save = require('./save');

exports.findAndSave = function(place, reportItem, options) {
	var alarms = find(place, reportItem, options);
	return save(alarms);
};
