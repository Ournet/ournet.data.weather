'use strict';

var utils = require('./utils');
var Promise = utils.Promise;
var cache = require('memory-cache');
var AccessService = require('./access');

var Service = module.exports = function() {
	AccessService.call(this);
};

Service.prototype = new AccessService();

Service.instance = new Service();

Service.prototype.getForecast = function(selector) {
	var key = ['place-weather-', selector.id].join('-');
	var result = cache.get(key);
	if (result) {
		return Promise.resolve(result);
	}

	return AccessService.prototype.getForecast.call(this, selector)
		.then(function(forecast) {
			if (forecast) {
				cache.put(key, forecast, 60 * 1 * 1000);
			}
			return forecast;
		});
};

// Service.prototype.getPlacesForecast = function(country_code, date, places) {
//   var key = ['places-weather-', country_code, date].join('-'),
//   result = cache.get(key);
//   if (result) return core.Promise.resolve(result);

//   return AccessService.prototype.getPlacesForecast.call(this, country_code, date, places).then(function(result) {
//     if (result)
//       cache.set(key, result, 60 * 1);
//     return result;
//   });
// };
