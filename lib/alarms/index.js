'use strict';

var find = exports.find = require('./find');
var save = exports.save = require('./save');

exports.findAndSave = function(place, reportItem, options) {
	return find(place, reportItem, options).then(save);
};
