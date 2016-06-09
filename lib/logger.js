'use strict';

exports.error = exports.warn = exports.info = function() {};

exports.set = function(logger) {
	exports.error = logger.error || exports.error;
	exports.warn = logger.warn || exports.warn;
	exports.info = logger.info || exports.info;
};

exports.reset = function() {
	exports.error = exports.warn = exports.info = function() {};
};
