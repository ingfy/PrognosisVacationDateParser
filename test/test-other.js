var assert = require('assert');

var format = require('../src/format');

describe('format (other)', function () {
    describe('tests.all', function () {

        var input = 'asdæ øå123 /¡@@£5432---\\n234-@£$¡–@123';
        it('should not crash with weird symbols [' + input + ']', function () {
            assert.equal(format.tests.day.test(input).matches, false, 'day matches');
            assert.equal(format.tests.month.test(input).matches, false, 'month matches');
            assert.equal(format.tests.year.test(input).matches, false, 'year matches');
            assert.equal(format.tests.hours.test(input).matches, false, 'hours matches');
            assert.equal(format.tests.rangeYear.test(input).matches, false, 'rangeYear matches');
            assert.equal(format.tests.rangeMonth.test(input).matches, false, 'rangeMonth matches');
            assert.equal(format.tests.rangeDay.test(input).matches, false, 'rangeDay matches');
        });

    });
});
