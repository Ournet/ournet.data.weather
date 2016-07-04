'use strict';

var assert = require('assert');
var DailyReport = require('../lib/daily_report/report');

var report = JSON.parse('{\"date\":\"2016-07-04\",\"times\":[{\"period\":1,\"time\":1467590400000,\"symbol\":{\"number\":3,\"numberEx\":3,\"name\":\"Partly cloudy\",\"var\":\"03d\"},\"p\":{\"value\":0},\"wind\":{\"dir\":{\"deg\":\"342.7\",\"code\":\"NNW\",\"name\":\"North-northwest\"},\"speed\":{\"mps\":2.7,\"name\":\"Light breeze\",\"beaufort\":2}},\"t\":{\"unit\":\"celsius\",\"value\":14},\"pressure\":{\"unit\":\"hPa\",\"value\":1006.8}},{\"period\":2,\"time\":1467612000000,\"symbol\":{\"number\":9,\"numberEx\":9,\"name\":\"Rain\",\"var\":\"09\"},\"p\":{\"value\":2},\"wind\":{\"dir\":{\"deg\":\"341.3\",\"code\":\"NNW\",\"name\":\"North-northwest\"},\"speed\":{\"mps\":3.6,\"name\":\"Gentle breeze\",\"beaufort\":3}},\"t\":{\"unit\":\"celsius\",\"value\":21},\"pressure\":{\"unit\":\"hPa\",\"value\":1006}},{\"period\":3,\"time\":1467633600000,\"symbol\":{\"number\":5,\"numberEx\":40,\"name\":\"Light rain showers\",\"var\":\"40d\"},\"p\":{\"value\":0},\"wind\":{\"dir\":{\"deg\":\"357.2\",\"code\":\"N\",\"name\":\"North\"},\"speed\":{\"mps\":3.2,\"name\":\"Light breeze\",\"beaufort\":2}},\"t\":{\"unit\":\"celsius\",\"value\":20},\"pressure\":{\"unit\":\"hPa\",\"value\":1005.8}},{\"period\":0,\"time\":1467655200000,\"symbol\":{\"number\":3,\"numberEx\":3,\"name\":\"Partly cloudy\",\"var\":\"mf/03n.01\"},\"p\":{\"value\":0},\"wind\":{\"dir\":{\"deg\":\"355.2\",\"code\":\"N\",\"name\":\"North\"},\"speed\":{\"mps\":2.2,\"name\":\"Light breeze\",\"beaufort\":2}},\"t\":{\"unit\":\"celsius\",\"value\":18},\"pressure\":{\"unit\":\"hPa\",\"value\":1005.8}}]}');

describe('DailyReport', function() {
	it('should format', function() {
		var result = DailyReport.format(report);
		assert.ok(result);
		// console.log(result);
	});
	it('should parse', function() {
		var result = DailyReport.format(report);
		result = DailyReport.parse(result);
		assert.ok(result);
		// console.log(result.times);
	});
});
