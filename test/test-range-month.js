var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.rangeMonth', function () {
        it('should match complete month [01.7.15 - 31.12]', function () {
            var input = '01.7.15 - 31.12';

            var result = format.tests.rangeMonth.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.firstDate.getFullYear(), 2015, 'first date year');
            assert.equal(result.firstDate.getMonth(), 6, 'first date month nr');
            assert.equal(result.firstDate.getDate(), 1, 'first date day');

            assert.equal(result.secondResult.completePart.day, 31, 'day');
            assert.equal(result.secondResult.completePart.nr, 11, 'month nr');
        });
    });
});
