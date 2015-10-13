'use strict';

// var core = require('ournet.core');
// var cache = new core.MemoryCache({
// 	name: 'weather.access'
// });
var AccessService = require('./access.js');

var Service = module.exports = function() {
	AccessService.call(this);
};

Service.prototype = new AccessService();

Service.instance = new Service();

// Service.prototype.getForecast = function(selector) {
//   var key = ['place', selector.id].join('-'),
//   result = cache.get(key);
//   if (result) return core.Promise.resolve(result);

//   return AccessService.prototype.getForecast.call(this, selector).then(function(result) {
//     if (result)
//       cache.set(key, result, 60 * 1);
//     return result;
//   });
// };

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
