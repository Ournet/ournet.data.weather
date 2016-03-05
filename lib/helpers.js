'use strict';

var symbolnames = require('./symbol_names.json');

exports.symbolName = function(symbol, lang) {
	if (!symbolnames[lang]) {
		return symbol.name;
	}
	return symbolnames[lang][symbol.number - 1];
};

exports.formatForecastId = function(coords, l) {
	l = (typeof l === 'number') ? l : 1;
	return [coords.lat.toFixed(l), coords.lon.toFixed(l)].join(':');
};
