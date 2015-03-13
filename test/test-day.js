var assert = require('assert');

var format = require('../src/format');

describe('format', function () {
    describe('tests.day', function () {
        it('should match complete day [31]', function () {
            var input = '31';

            var result = format.tests.day.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.completePart.day, 31, 'day');
        });

        it('should match complete day [10]', function () {
            var input = '10';

            var result = format.tests.day.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.completePart.day, 10, 'day');
        });

        it('should match incomplete day [0]', function () {
            var input = '0';

            var result = format.tests.day.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, false, 'complete');

            assert.equal(result.incompletePart.dayString, '0', 'dayString');
        });

        it('should not days days under [0, 31] [00]', function () {
            var input = '00';

            var result = format.tests.day.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match days over [0, 31] [32]', function () {
            var input = '32';

            var result = format.tests.day.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should not match days with sep [27.]', function () {
            var input = '27.';

            var result = format.tests.day.test(input);

            assert.equal(result.matches, false, 'matches');
        });

        it('should match guaranteed complete single-digit day [6]', function () {
            var input = '6';

            var result = format.tests.day.test(input);

            assert.equal(result.matches, true, 'matches');
            assert.equal(result.complete, true, 'complete');

            assert.equal(result.completePart.day, 6, 'day');
        });
    });
});
