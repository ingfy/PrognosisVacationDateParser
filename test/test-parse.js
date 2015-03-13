var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.parse', function () {
        it('should detect range with complete year [01.7.15 - 31.12.2016]', function () {
            var input = '01.7.15 - 31.12.2016';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, true, 'result is a range');
            assert.equal(result.dateType, 'rangeYear', 'dateType == rangeYear');

            var firstDate = result.parseResult.firstDate;

            assert.equal(firstDate.getFullYear(), 2015, 'first date year');
            assert.equal(firstDate.getMonth(), 6, 'first date month nr');
            assert.equal(firstDate.getDate(), 1, 'first date day');

            var secondDateResult = result.parseResult.secondResult;

            assert.equal(secondDateResult.complete, true, 'second date complete');

            var completed = secondDateResult.completePart;

            assert.equal(completed.year, 2016, 'second date year');
            assert.equal(completed.nr, 11, 'second date month nr');
            assert.equal(completed.day, 31, 'second date day');
        });

        it('should detect range with complete two-digit year [09.09.09 - 10.10.10]', function () {
            var input = '09.09.09 - 10.10.10';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, true, 'result is range');
            assert.equal(result.dateType, 'rangeYear', 'dateType == rangeYear');

            var firstDate = result.parseResult.firstDate;

            assert.equal(firstDate.getFullYear(), 2009, 'first date year');
            assert.equal(firstDate.getMonth(), 8, 'first date month nr');
            assert.equal(firstDate.getDate(), 9, 'first date day');

            var secondDateResult = result.parseResult.secondResult;

            assert.equal(secondDateResult.complete, true, 'second result complete');

            var complete = secondDateResult.completePart;

            assert.equal(complete.year, 2010, 'second date year');
            assert.equal(complete.nr, 9, 'second date month nr');
            assert.equal(complete.day, 10, 'second date day');
        });

        it('should detect range with incomplete year [01.02.2003 - 02.03.200]', function () {
            var input = '01.02.2003 - 02.03.200';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, true, 'result is a range');
            assert.equal(result.dateType, 'rangeYear', 'dateType = rangeYear');

            var firstDate = result.parseResult.firstDate;

            assert.equal(firstDate.getFullYear(), 2003, 'first date year');
            assert.equal(firstDate.getMonth(), 1, 'first date month nr');
            assert.equal(firstDate.getDate(), 1, 'first date day');

            var secondDateResult = result.parseResult.secondResult;

            assert.equal(secondDateResult.complete, false, 'second date incomplete');

            var complete = secondDateResult.completePart;

            assert.equal(complete.day, 2, 'second date day');
            assert.equal(complete.nr, 2, 'second date month nr');

            var incomplete = secondDateResult.incompletePart;

            assert.equal(incomplete.yearString, '200', 'second date year string');
        });

        it('should detect range with complete month [1.1.11 - 2.2]', function () {
            var input = '1.1.11 - 2.2';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, true, 'result is a range');
            assert.equal(result.dateType, 'rangeMonth', 'dateType = rangeMonth');
        });

        it('should detect range with complete day [4.4.14 - 5]', function () {
            var input = '4.4.14 - 5';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, true, 'result is a range');
            assert.equal(result.dateType, 'rangeDay', 'dateType = rangeDay');
        });

        it('should detect range with empty day [31.12.2099-]', function () {
            var input = '31.12.2099-';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, true, 'result is a range');
            assert.equal(result.dateType, 'rangeDay', 'dateType = rangeDay');
        });

        it('should detect single date with complete hours [05.02.14 1 hour]', function () {
            var input = '05.02.14 1 hour';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, false, 'result is not a range');
            assert.equal(result.dateType, 'hours', 'dateType = hours');
        });

        it('should detect single date with incomplete hours [1.1.11 1]', function () {
            var input = '1.1.11 1';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, false, 'result is not a range');
            assert.equal(result.dateType, 'hours', 'dateType = hours');
        });

        it('should detect single date with complete year [3.2.2000]', function () {
            var input = '3.2.2000';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, false, 'result is not a range');
            assert.equal(result.dateType, 'year', 'dateType = year');
        });

        it('should detect single date with complete month [9.9]', function () {
            var input = '9.9';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, false, 'result is not a range');
            assert.equal(result.dateType, 'month', 'dateType = month');
        });

        it('should detect single date with incomplete month [7.]', function () {
            var input = '7.';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, false, 'result is not a range');
            assert.equal(result.dateType, 'month', 'dateType = month');
        });

        it('should detect complete single day [10]', function () {
            var input = '10';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, false, 'result is not a range');
            assert.equal(result.dateType, 'day', 'dateType = day');
        });

        it('should detect incomplete single day [1]', function () {
            var input = '1';

            var result = format.parse(input);

            assert.notEqual(result, null, 'result is not null');

            assert.equal(result.isRange, false, 'result is not a range');
            assert.equal(result.dateType, 'day', 'dateType = day');
        });

        /* negative examples */
        it('should not detect gibberish [asd123gsfdl--23/\213\\\\123¡@£œ$]', function () {
            var input = 'asd123gsfdl--23/\213\\\\123¡@£œ$';

            var result = format.parse(input);

            assert.equal(result, null, 'result is null');
        });
    });
});
