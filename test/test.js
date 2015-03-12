var assert = require('assert');

var format = require('../format');

describe('format', function () {
    describe('tests.year', function () {
        it('should parse complete years correctly', function () {
            var input = '1.1.2015';

            var result = format.tests.year.test(input);

            assert.equal(result.matches, true);
            assert.equal(result.completed, true);

            var completedPart = result.completedPart;

            assert.equal(completedPart.day, 1);
            assert.equal(completedPart.nr, 0);
            assert.equal(completedPart.year, 2015);
        });
    });
});
