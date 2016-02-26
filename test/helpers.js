/*eslint handle-callback-err:1*/
'use strict';

var helpers = require('../lib/helpers');
var assert = require('assert');

describe('helpers', function() {
	it('should convert wind speed from m/s to Beaufort', function() {
		var bf = helpers.windSpeedToBeaufort(3.5);
		assert.equal(3, bf);
	});
});
