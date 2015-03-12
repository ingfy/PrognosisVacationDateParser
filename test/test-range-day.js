var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.rangeDay', function () {
        it('should match complete day [01.7.15 - 31]', function () {
            var input = '01.7.15 - 31';

            var result = format.tests.rangeDay.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.firstDate.getFullYear(), 2015, 'first date year');
            assert.equal(result.firstDate.getMonth(), 6, 'first date month nr');
            assert.equal(result.firstDate.getDate(), 1, 'first date day');

            assert.equal(result.secondResult.completePart.day, 31, 'day');
        });

        it('should match incomplete day [31.01.2011 - 2]', function () {
            var input = '31.01.2011 - 2';

            var result = format.tests.rangeDay.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            assert.equal(result.firstDate.getFullYear(), 2011, 'first date year');
            assert.equal(result.firstDate.getMonth(), 0, 'first date month nr');
            assert.equal(result.firstDate.getDate(), 31, 'first date day');

            assert.equal(result.secondResult.incompletePart.dayString, '2', 'dayString');
        });

        it('should handle leap year in first date [29.02.2016 - 1]', function () {
            var input = '29.02.2016 - 1';

            var result = format.tests.rangeDay.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            assert.equal(result.firstDate.getFullYear(), 2016, 'first date year');
            assert.equal(result.firstDate.getMonth(), 1, 'first date month nr');
            assert.equal(result.firstDate.getDate(), 29, 'first date day');

            assert.equal(result.secondResult.incompletePart.dayString, '1', 'dayString');
        });

        it('should not match invalid first date [31.04.1999 - 5]', function () {
            var input = '31.04.1999 - 5';

            var result = format.tests.rangeDay.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match invalid day [01.04.1999 - 50]', function () {
            var input = '01.04.1999 - 50';

            var result = format.tests.rangeDay.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match completed day [15.1.2000 - 1.]', function () {
            var input = '15.1.2000 - 1.';

            var result = format.tests.rangeDay.test(input);

            assert.equal(result.matches, false, 'matches');
        })

        it('should match empty day [11.11.11-]', function () {
            var input = '11.11.11-';

            var result = format.tests.rangeDay.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            assert.equal(result.secondResult.incompletePart.dayString, '', 'dayString');
        });
    });
});
