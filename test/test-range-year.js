var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.rangeYear', function () {
        it('should match complete two-digit year [01.7.15 - 31.12.12]', function () {
            var input = '01.7.15 - 31.12.12';

            var result = format.tests.rangeYear.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.firstDate.getFullYear(), 2015, 'first date year');
            assert.equal(result.firstDate.getMonth(), 6, 'first date month nr');
            assert.equal(result.firstDate.getDate(), 1, 'first date day');

            assert.equal(result.secondResult.completePart.day, 31, 'day');
            assert.equal(result.secondResult.completePart.nr, 11, 'month nr');
            assert.equal(result.secondResult.completePart.year, 2012, 'year');
        });

        it('should match when second date is before first date [01.01.1999 - 31.12.1998]', function () {
            var input = '01.01.1999 - 31.12.1998';

            var result = format.tests.rangeYear.test(input);

            assert.equal(result.matches, true, 'matches');
        });
    });
});
