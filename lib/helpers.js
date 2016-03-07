'use strict';

var Symbols = require('metno-symbols');

exports.symbolName = function(symbol, lang) {
	symbol = typeof symbol === 'number' ? symbol : symbol.number;
	return Symbols.symbolName(symbol, lang) || '';
};

exports.formatForecastKey = function(place) {
	return [place.latitude.toFixed(1), place.longitude.toFixed(0)].join(':');
};
