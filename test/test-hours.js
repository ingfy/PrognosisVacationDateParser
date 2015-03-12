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
            assert.equal(completePart.hours, 5.0, 'hours');
        });

        it('should parse complete hours correctly [13.4.2011 8,5h]', function () {
            var input = '13.4.2011 8.5h';

            var result = format.tests.hours.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'completed');

            var completePart = result.completePart;

            assert.equal(completePart.day, 13, 'day');
            assert.equal(completePart.nr, 3, 'month nr');
            assert.equal(completePart.year, 2011, 'year');
            assert.equal(completePart.hours, 8.5, 'hours');
        });

        it('should parse incomplete one-digit hours correctly [12.03.2022 1]', function () {
            var input = '12.03.2022 1';

            var result = format.tests.hours.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'completed');

            var completePart = result.completePart;

            assert.equal(completePart.day, 12, 'day');
            assert.equal(completePart.nr, 2, 'month nr');
            assert.equal(completePart.year, 2022, 'year');

            assert.equal(result.incompletePart.hoursString, '1', 'hoursString');
        });

        it('should parse incomplete one-digit-with-decimal-separator hours correctly [12.03.2022 7,]', function () {
            var input = '12.03.2022 7,';

            var result = format.tests.hours.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'completed');

            var completePart = result.completePart;

            assert.equal(completePart.day, 12, 'day');
            assert.equal(completePart.nr, 2, 'month nr');
            assert.equal(completePart.year, 2022, 'year');

            assert.equal(result.incompletePart.hoursString, '7,', 'hoursString');
        });

        it('should parse incomplete one-digit-with-decimal-separator hours correctly [12.03.2022 7.]', function () {
            var input = '12.03.2022 7.';

            var result = format.tests.hours.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'completed');

            var completePart = result.completePart;

            assert.equal(completePart.day, 12, 'day');
            assert.equal(completePart.nr, 2, 'month nr');
            assert.equal(completePart.year, 2022, 'year');

            assert.equal(result.incompletePart.hoursString, '7.', 'hoursString');
        });

        it('should handle a natural mix of space and forward slash for separating date [7/3 2009 7 timer]', function () {
            var input = '7/3 2009 7 timer';

            var result = format.tests.hours.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            var completePart = result.completePart;

            assert.equal(completePart.day, 7, 'day');
            assert.equal(completePart.nr, 2, 'month nr');
            assert.equal(completePart.year, 2009, 'year');
            assert.equal(completePart.hours, 7.0, 'hours');
        });
    });
});
