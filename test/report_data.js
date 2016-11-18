'use strict';

var assert = require('assert');

var reportData = require('../lib/report_data');
var hash = require('object-hash');
var jsonReport = '{"days":[{"date":"2016-11-18","times":[{"time":1479492000000,"symbol":{"number":9},"wind":{"dir":{"code":"E"},"speed":{"mps":0.4,"beaufort":1}},"t":{"unit":"celsius","value":5},"pressure":{"unit":"hPa","value":1016.3},"humidity":{"percent":98.1},"cloudiness":{"percent":100},"fog":{"percent":0}}]},{"date":"2016-11-19","times":[{"time":1479513600000,"symbol":{"number":10},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.6,"beaufort":1}},"t":{"unit":"celsius","value":5},"pressure":{"unit":"hPa","value":1015.2},"humidity":{"percent":95},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1479535200000,"symbol":{"number":9},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":5},"pressure":{"unit":"hPa","value":1012.7},"humidity":{"percent":92.7},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1479556800000,"symbol":{"number":9},"wind":{"dir":{"code":"E"},"speed":{"mps":0.4,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1010.6},"humidity":{"percent":96.8},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1479578400000,"symbol":{"number":9},"wind":{"dir":{"code":"SW"},"speed":{"mps":0.5,"beaufort":1}},"t":{"unit":"celsius","value":6},"pressure":{"unit":"hPa","value":1010.6},"humidity":{"percent":97},"cloudiness":{"percent":91.4},"fog":{"percent":0}}]},{"date":"2016-11-20","times":[{"time":1479600000000,"symbol":{"number":3},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.9,"beaufort":1}},"t":{"unit":"celsius","value":3},"pressure":{"unit":"hPa","value":1013.5},"humidity":{"percent":93.8},"cloudiness":{"percent":79.7},"fog":{"percent":0}},{"time":1479621600000,"symbol":{"number":4},"wind":{"dir":{"code":"NW"},"speed":{"mps":1.1,"beaufort":1}},"t":{"unit":"celsius","value":1},"pressure":{"unit":"hPa","value":1016},"humidity":{"percent":92.7},"cloudiness":{"percent":94.5},"fog":{"percent":0}},{"time":1479643200000,"symbol":{"number":4},"wind":{"dir":{"code":"E"},"speed":{"mps":0.4,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1016.8},"humidity":{"percent":71.9},"cloudiness":{"percent":97.7},"fog":{"percent":0}},{"time":1479664800000,"symbol":{"number":4},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.3,"beaufort":1}},"t":{"unit":"celsius","value":4},"pressure":{"unit":"hPa","value":1017.7},"humidity":{"percent":93.9},"cloudiness":{"percent":88.3},"fog":{"percent":0}}]},{"date":"2016-11-21","times":[{"time":1479686400000,"symbol":{"number":4},"wind":{"dir":{"code":"W"},"speed":{"mps":0.9,"beaufort":1}},"t":{"unit":"celsius","value":2},"pressure":{"unit":"hPa","value":1019.2},"humidity":{"percent":77.1},"cloudiness":{"percent":91.4},"fog":{"percent":0}},{"time":1479708000000,"symbol":{"number":3},"wind":{"dir":{"code":"W"},"speed":{"mps":0.7,"beaufort":1}},"t":{"unit":"celsius","value":2},"pressure":{"unit":"hPa","value":1018.6},"humidity":{"percent":82.2},"cloudiness":{"percent":82.8},"fog":{"percent":0}},{"time":1479729600000,"symbol":{"number":4},"wind":{"dir":{"code":"E"},"speed":{"mps":0.6,"beaufort":1}},"t":{"unit":"celsius","value":9},"pressure":{"unit":"hPa","value":1018},"humidity":{"percent":67.1},"cloudiness":{"percent":92.2},"fog":{"percent":0}},{"time":1479751200000,"symbol":{"number":4},"wind":{"dir":{"code":"NW"},"speed":{"mps":1.1,"beaufort":1}},"t":{"unit":"celsius","value":6},"pressure":{"unit":"hPa","value":1018.3},"humidity":{"percent":82.2},"cloudiness":{"percent":96.9},"fog":{"percent":0}}]},{"date":"2016-11-22","times":[{"time":1479772800000,"symbol":{"number":9},"wind":{"dir":{"code":"W"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":6},"pressure":{"unit":"hPa","value":1017.9},"humidity":{"percent":86.8},"cloudiness":{"percent":96.1},"fog":{"percent":0}},{"time":1479794400000,"symbol":{"number":9},"wind":{"dir":{"code":"W"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":5},"pressure":{"unit":"hPa","value":1018.1},"humidity":{"percent":89.5},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1479816000000,"symbol":{"number":46},"wind":{"dir":{"code":"NE"},"speed":{"mps":0.5,"beaufort":1}},"t":{"unit":"celsius","value":9},"pressure":{"unit":"hPa","value":1019.3},"humidity":{"percent":94.2},"cloudiness":{"percent":96.1},"fog":{"percent":0}},{"time":1479837600000,"symbol":{"number":9},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1020.5},"humidity":{"percent":94.7},"cloudiness":{"percent":99.2},"fog":{"percent":0}}]},{"date":"2016-11-23","times":[{"time":1479859200000,"symbol":{"number":9},"wind":{"dir":{"code":"W"},"speed":{"mps":1.1,"beaufort":1}},"t":{"unit":"celsius","value":6},"pressure":{"unit":"hPa","value":1022.3},"humidity":{"percent":95.2},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1479880800000,"symbol":{"number":9},"wind":{"dir":{"code":"W"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1022.4},"humidity":{"percent":95.4},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1479902400000,"symbol":{"number":46},"wind":{"dir":{"code":"NE"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":10},"pressure":{"unit":"hPa","value":1023},"humidity":{"percent":87.7},"cloudiness":{"percent":96.1},"fog":{"percent":0}},{"time":1479924000000,"symbol":{"number":4},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":8},"pressure":{"unit":"hPa","value":1023.9},"humidity":{"percent":93.9},"cloudiness":{"percent":100},"fog":{"percent":0}}]},{"date":"2016-11-24","times":[{"time":1479945600000,"symbol":{"number":4},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.9,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1023.9},"humidity":{"percent":84.8},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1479967200000,"symbol":{"number":4},"wind":{"dir":{"code":"NW"},"speed":{"mps":1.4,"beaufort":1}},"t":{"unit":"celsius","value":4},"pressure":{"unit":"hPa","value":1022.3},"humidity":{"percent":85.8},"cloudiness":{"percent":89.1},"fog":{"percent":0}},{"time":1479988800000,"symbol":{"number":4},"wind":{"dir":{"code":"N"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":9},"pressure":{"unit":"hPa","value":1020.8},"humidity":{"percent":82},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1480010400000,"symbol":{"number":4},"wind":{"dir":{"code":"N"},"speed":{"mps":0.9,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1019.6},"humidity":{"percent":92.4},"cloudiness":{"percent":100},"fog":{"percent":0}}]},{"date":"2016-11-25","times":[{"time":1480032000000,"symbol":{"number":9},"wind":{"dir":{"code":"N"},"speed":{"mps":1,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1018.5},"humidity":{"percent":91.9},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1480053600000,"symbol":{"number":9},"wind":{"dir":{"code":"NW"},"speed":{"mps":0.8,"beaufort":1}},"t":{"unit":"celsius","value":7},"pressure":{"unit":"hPa","value":1016.6},"humidity":{"percent":92.2},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1480075200000,"symbol":{"number":9},"wind":{"dir":{"code":"N"},"speed":{"mps":0.2,"beaufort":0}},"t":{"unit":"celsius","value":8},"pressure":{"unit":"hPa","value":1015.8},"humidity":{"percent":97.8},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1480096800000,"symbol":{"number":46},"wind":{"dir":{"code":"W"},"speed":{"mps":0.5,"beaufort":1}},"t":{"unit":"celsius","value":6},"pressure":{"unit":"hPa","value":1015.6},"humidity":{"percent":95.4},"cloudiness":{"percent":99.2},"fog":{"percent":0}}]},{"date":"2016-11-26","times":[{"time":1480118400000,"symbol":{"number":3},"wind":{"dir":{"code":"NW"},"speed":{"mps":1.3,"beaufort":1}},"t":{"unit":"celsius","value":3},"pressure":{"unit":"hPa","value":1016.1},"humidity":{"percent":86.5},"cloudiness":{"percent":83.6},"fog":{"percent":0}},{"time":1480140000000,"symbol":{"number":3},"wind":{"dir":{"code":"W"},"speed":{"mps":1.5,"beaufort":1}},"t":{"unit":"celsius","value":0},"pressure":{"unit":"hPa","value":1016.1},"humidity":{"percent":86.7},"cloudiness":{"percent":96.1},"fog":{"percent":0}},{"time":1480161600000,"symbol":{"number":4},"wind":{"dir":{"code":"E"},"speed":{"mps":0.4,"beaufort":1}},"t":{"unit":"celsius","value":9},"pressure":{"unit":"hPa","value":1016.9},"humidity":{"percent":64.4},"cloudiness":{"percent":96.1},"fog":{"percent":0}},{"time":1480183200000,"symbol":{"number":4},"wind":{"dir":{"code":"W"},"speed":{"mps":0.7,"beaufort":1}},"t":{"unit":"celsius","value":6},"pressure":{"unit":"hPa","value":1018.3},"humidity":{"percent":83.4},"cloudiness":{"percent":100},"fog":{"percent":0}}]},{"date":"2016-11-27","times":[{"time":1480204800000,"symbol":{"number":4},"wind":{"dir":{"code":"W"},"speed":{"mps":0.7,"beaufort":1}},"t":{"unit":"celsius","value":3},"pressure":{"unit":"hPa","value":1019.2},"humidity":{"percent":83.6},"cloudiness":{"percent":100},"fog":{"percent":0}},{"time":1480226400000,"symbol":{"number":4},"wind":{"dir":{"code":"NW"},"speed":{"mps":1,"beaufort":1}},"t":{"unit":"celsius","value":2},"pressure":{"unit":"hPa","value":1018.2},"humidity":{"percent":82.2},"cloudiness":{"percent":90.6},"fog":{"percent":0}},{"time":1480248000000,"symbol":{"number":2},"wind":{"dir":{"code":"E"},"speed":{"mps":0.9,"beaufort":1}},"t":{"unit":"celsius","value":9},"pressure":{"unit":"hPa","value":1016.4},"humidity":{"percent":64.6},"cloudiness":{"percent":13.3},"fog":{"percent":0}},{"time":1480269600000,"symbol":{"number":1},"wind":{"dir":{"code":"W"},"speed":{"mps":1.3,"beaufort":1}},"t":{"unit":"celsius","value":3},"pressure":{"unit":"hPa","value":1014.4},"humidity":{"percent":80.3},"cloudiness":{"percent":0},"fog":{"percent":0}}]},{"date":"2016-11-28","times":[{"time":1480291200000,"symbol":{"number":3},"wind":{"dir":{"code":"NW"},"speed":{"mps":1.4,"beaufort":1}},"t":{"unit":"celsius","value":1},"pressure":{"unit":"hPa","value":1012},"humidity":{"percent":81.2},"cloudiness":{"percent":96.1},"fog":{"percent":0}}]}],"timezone":"Europe/Rome"}';
var report = JSON.parse(jsonReport);

describe('reportData', function() {

	it('#gzip', function() {
		console.log('1', Date.now());
		return reportData.zip(report)
			.then(function(gzipReport) {
				console.log('2', Date.now());
				return reportData.unzip(gzipReport)
					.then(function(unzipReport) {
						console.log('3', Date.now());
						var jsonReport2 = JSON.stringify(unzipReport);
						// console.log(jsonReport2);
						assert.equal(hash(jsonReport), hash(jsonReport2));
					});
			});
	});

});
