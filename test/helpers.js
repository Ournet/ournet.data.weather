'use strict';

var helpers = require('../lib/helpers');
var assert = require('assert');

describe('helpers', function() {
	it('should get weather symbol name', function() {
		var name = helpers.symbolName({ number: 1 }, 'ro');
		assert.equal('Senin', name);
		name = helpers.symbolName(1, 'ro');
		assert.equal('Senin', name);
	});
});
