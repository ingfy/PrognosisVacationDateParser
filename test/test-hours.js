var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.hours', function () {
        it('should parse complete hours correctly [1.1.2015 5h]', function () {
            var input = '1.1.2015 5h';

            var result = format.tests.hours.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'completed');

            var completePart = result.completePart;

            assert.equal(completePart.day, 1, 'day');
            assert.equal(completePart.nr, 0, 'month nr');
            assert.equal(completePart.year, 2015, 'year');
        });
    });
});
