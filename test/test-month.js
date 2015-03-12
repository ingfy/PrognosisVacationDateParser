var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.month', function () {
        it('should parse a guaranteed completed month correctly [7.12]', function () {
            var input = '7.12';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            var completePart = result.completePart;

            assert.equal(completePart.day, 7, 'day');
            assert.equal(completePart.nr, 11, 'month nr');
        });

        it('should parse guaranteed leading-zero month correctly [5.09]', function () {
            var input = '5.09';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            var completePart = result.completePart;

            assert.equal(completePart.day, 5, 'day');
            assert.equal(completePart.nr, 8, 'month nr');
        });

        it('should mark guaranteed completed month as completed [25.2]', function () {
            var input = '25.2';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            var completePart = result.completePart;

            assert.equal(completePart.day, 25, 'day');
            assert.equal(completePart.nr, 1, 'month nr');
        });

        it('should not mark possibly unfinished months as completed [09.1]', function () {
            var input = '09.1';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            assert.equal(result.completePart.day, 9, 'day');

            assert.equal(result.incompletePart.monthString, '1', 'monthString');
        });

        it('should not match only day [28]', function () {
            var input = '28';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should match only day and sep [28.]', function () {
            var input = '28.';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            assert.equal(result.completePart.day, 28, 'day');

            assert.equal(result.incompletePart.monthString, '', 'monthString');
        });

        it('should not match months under [1, 12] [3.00]', function () {
            var input = '3.00';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match months over [1, 12] [21.13]', function () {
            var input = '21.13';

            var result = format.tests.month.test(input);

            assert.equal(result.matches, false, 'matches');
        });
    });
});
