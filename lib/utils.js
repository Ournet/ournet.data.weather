'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var utils = require('ournet.utils');

module.exports = _.assign({
	_: _,
	Promise: Promise
}, utils, exports);
