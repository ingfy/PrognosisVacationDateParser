var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.year', function () {
        it('should parse complete years correctly [1.1.2015]', function () {
            var input = '1.1.2015';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'completed');

            var completePart = result.completePart;

            assert.equal(completePart.day, 1, 'day');
            assert.equal(completePart.nr, 0, 'month nr');
            assert.equal(completePart.year, 2015, 'year');
        });

        it('should handle leading zero in day [09.1.2000]', function () {
            var input = '09.1.2000';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'completed');

            var completePart = result.completePart;

            assert.equal(completePart.day, 9, 'day');
            assert.equal(completePart.nr, 0, 'month nr');
            assert.equal(completePart.year, 2000, 'year');
        });

        it('should handle leading zero in month [7.07.1993]', function () {
            var input = '7.07.1993';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            var completePart = result.completePart;

            assert.equal(completePart.day, 7, 'day');
            assert.equal(completePart.nr, 6, 'month nr');
            assert.equal(completePart.year, 1993, 'year');
        });

        it('should not parse invalid full year date [31.2.2015]', function () {
            var input = '31.2.2015';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should complete two-digit year numbers [1.1.15] -> 1.1.2015', function () {
            var input = '1.1.15';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            var completePart = result.completePart;

            assert.equal(completePart.day, 1, 'day');
            assert.equal(completePart.nr, 0, 'month nr');
            assert.equal(completePart.year, 2015, 'year');
        });

        it('should match incomplete year [1.1.1]', function () {
            var input = '1.1.1';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            var completePart = result.completePart;

            assert.equal(completePart.day, 1, 'day');
            assert.equal(completePart.nr, 0, 'month nr');
            assert.equal(completePart.year, null, 'year');

            var incompletePart = result.incompletePart;

            assert.equal(incompletePart.yearString, '1', 'year string');
        });

        it('should not mark three-digit year values as complete [1.12.201]', function () {
            var input = '1.12.201';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');
        });

        it('should match missing year with day and month and separator [1.1.]', function () {
            var input = '1.1.';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            var incompletePart = result.incompletePart;

            assert.equal(incompletePart.yearString, '', 'year string');
        });

        it('should not match only day and month [1.1]', function () {
            var input = '1.1';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match days under [1, 31] [0.1.15]', function () {
            var input = '0.1.15';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match days over [1, 31] [32.1.15]', function () {
            var input = '32.1.15';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match months under [1, 12] [5.0.15]', function () {
            var input = '5.0.15';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match months over [1, 12] [5.13.2015]', function () {
            var input = '5.13.2015';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should handle leap year [29.02.2020]', function () {
            var input = '29.02.2020';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.completePart.year, 2020, 'year');
            assert.equal(result.completePart.nr, 1, 'month nr');
            assert.equal(result.completePart.day, 29, 'day');
        });

        it('should handle / as separator [1/2/34]', function () {
            var input = '1/2/34';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.completePart.year, 2034, 'year');
            assert.equal(result.completePart.nr, 1, 'month nr');
            assert.equal(result.completePart.day, 1, 'day');
        });

        it('should handle " " (space) as a separator [1.9 2015]', function () {
            var input = '1.9 2015';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.completePart.year, 2015, 'year');
            assert.equal(result.completePart.nr, 8, 'month nr');
            assert.equal(result.completePart.day, 1, 'day');
        });
    });
});
