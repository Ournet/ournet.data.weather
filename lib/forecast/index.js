'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var _ = utils._;
var metno = require('./metno');
var yrno = require('./yrno');
var helpers = require('../helpers');
var logger = require('../logger');
var debug = require('debug')('ournet.data.weather:forecast');

function recallOtherYr(selector, error) {
	if (~[404, 500].indexOf(error.statusCode) && selector.region !== 'Other') {
		selector.region = 'Other';
		return yrno.get(selector, { timeout: 2000, useid: true });
	}
	return Promise.reject(error);
}

exports.get = function(selector, options) {
	options = _.defaults(options || {}, { timeout: 2000, useid: true, provider: 'yrno' });

	if (options.provider === 'yrno') {
		return yrno.get(selector, options)
			.catch(function(error) {
				debug('yrno: error on getting forecast');
				return recallOtherYr(selector, error)
					.catch(function(error2) {
						logger.error('Yrno error:' + error2.message, error2);
						return metno.get(selector, { timeout: 1000 });
					});
			});
	} else {
		return metno.get(selector, { timeout: options.timeout || 1500 })
			.then(function(report) {
				debug('metno: SUCCESS on getting forecast');
				return report;
			})
			.catch(function(error) {
				debug('metno: error on getting forecast');
				return yrno.get(selector, options)
					.catch(function() {
						debug('yrno: error2 on getting forecast');
						return recallOtherYr(selector, error);
					});
			});
	}
};

exports.formatSelector = function(place) {
	var selector = yrno.formatSelector(place);

	selector.key = helpers.formatForecastKey(place);

	return selector;
};
