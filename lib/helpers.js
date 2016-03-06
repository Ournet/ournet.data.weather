'use strict';

var Symbols = require('metno-symbols');

exports.symbolName = function(symbol, lang) {
	symbol = typeof symbol === 'number' ? symbol : symbol.number;
	return Symbols.symbolName(symbol, lang) || '';
};

exports.formatForecastId = function(coords, l) {
	l = (typeof l === 'number') ? l : 0;
	return [coords.lat.toFixed(l), coords.lon.toFixed(l)].join(':');
};
