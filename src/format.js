'use strict';

var regExp = {
    parts: {
        sep: '[- /\\.]',
        dayPart: '(0?[1-9]|[12][0-9]|3[01])',
        monthPart: '(0?[1-9]|1[012])',
        yearPart: '((19|20|21)?\\d\\d)',
        hoursPart: '( (\\d([\\.|\\,]\\d*)?) ?(t|h|(timer)|(hours)|(hrs?)|(tm?r)))',
        completedDay: '(0[1-9]|[12]\d|3[01])',
        completedMonth: '(0[1-9]|1[012]|[2-9])'
    },

    build: function () {
        var repo = this.parts,
        out = [];

        for (var i = 0; i < arguments.length; i++) {
            var key = arguments[i];

            if ((!key in repo)) throw Error('Build error in regExp. Invalid key!');

            out.push(repo[key]);
        }

        return out.join('');
    }
};

var RANGE_PARTS_SEP = '-';

var patterns = {
    completed: {
        hours: new RegExp('^' + regExp.build('dayPart', 'sep', 'monthPart', 'sep', 'yearPart', 'hoursPart') + '$'),
        year: new RegExp('^' + regExp.build('dayPart', 'sep', 'monthPart', 'sep', 'yearPart') + '$'),
        month: new RegExp('^' + regExp.build('dayPart', 'sep', 'completedMonth') + '$'),
        day: new RegExp('^' + regExp.build('completedDay') + '$')
    },
    started: {
        hours: new RegExp('^' + regExp.build('dayPart', 'sep', 'monthPart', 'sep', 'yearPart') + '( (.*))$'),
        year: new RegExp('^' + regExp.build('dayPart', 'sep', 'monthPart', 'sep') + '([\\d]{0,3})$'),
        month: new RegExp('^' + regExp.build('dayPart', 'sep') + '([0-1]?)$'),
        day: new RegExp('^([0-3]?)$')
    }
};

function getDateIfValid(year, nr, day) {
    var date = new Date(year, nr, day);

    if (date.getFullYear() !== year || date.getMonth() !== nr || date.getDate() !== day) return null;

    return date;
}

function DateTest(completedPattern, startedPattern, testFunction) {
    this.completedPattern = completedPattern;
    this.startedPattern = startedPattern;
    this.testFunction = testFunction;
}

DateTest.prototype.test = function (str) {
    var completed = true,
        result = null;

    result = this.completedPattern.exec(str);

    if (!result) {
        completed = false;
        result = this.startedPattern.exec(str);
    }

    return this.testFunction(result, completed);
};

function CompletePart(year, nr, day) {
    this.year = year;
    this.nr = nr;
    this.day = day;
}

function IncompletePart(yearString, monthString, dayString) {
    this.yearString = yearString;
    this.monthString = monthString;
    this.dayString = dayString;
}

function DateTestResult(matches, complete, completePart, incompletePart) {
    if (this.complete && this.incompletePart) throw Error('Cannot both be complete and have incomplete data!');

    this.matches = matches;
    this.complete = complete;
    this.completePart = completePart;
    this.incompletePart = incompletePart;
}

var tests = {};
tests.hours = new DateTest(patterns.completed.hours, patterns.started.hours, function (parseResult, completed) {
    if (parseresult) {
        var day = ~~parseResult[1],
            nr = ~~parseResult[2] - 1,
            yearString = parseResult[3],
            yearValue = yearString.length === 2 ? ~~('20' + yearString) : ~~yearString,
            hoursString = parseResult[5];

        var completePart = new CompletePart(yearValue, nr, day, completed ? ~~hoursString : null),
            incompletePart = new IncompletePart(null, null, null, !completed ? hoursString : null);

        var date = getDateIfValid(completePart.year, completePart.nr, completePart.day);

        if (date) {
            return new DateTestResult(true, completed, completePart, incompletePart);
        }
    }

    return new DateTestResult(false);
});
tests.year = new DateTest(patterns.completed.year, patterns.started.year, function (parseResult, completed) {
    if (parseResult) {
        var day = ~~parseResult[1],
            nr = ~~parseResult[2] - 1,
            yearString = parseResult[3],
            yearValue = yearString.length === 2 ? ~~('20' + yearString) : ~~yearString;

        var completePart = new CompletePart(completed ? yearValue : null, nr, day),
            incompletePart = new IncompletePart(!completed ? yearString : null, null, null);

        if (completed) {    // Validate if the date is possible
            var date = getDateIfValid(completePart.year, completePart.nr, completePart.day);

            if (!date) return new DateTestResult(false);
        }

        return new DateTestResult(true, completed, completePart, incompletePart);
    }

    return new DateTestResult(false);
});
tests.month = new DateTest(patterns.completed.month, patterns.started.month, function (parseResult, completed) {
    if (parseResult) {
        var day = ~~parseResult[1],
            monthString = parseResult[2];

        var completePart = new CompletePart(null, completed ? ~~monthString - 1 : null, day),
            incompletePart = new IncompletePart(null, !completed ? monthString : null, null);

        return new DateTestResult(true, completed, completePart, incompletePart);
    }

    return new DateTestResult(false);
});
tests.day = new DateTest(patterns.completed.day, patterns.started.day, function (parseResult, completed) {
    if (parseResult) {
        var dayString = parseResult[1];

        var completePart = new CompletePart(null, null, completed ? ~~dayString : null),
            incompletePart = new IncompletePart(null, null, !completed ? dayString : null);

        return new DateTestResult(true, completed, completePart, incompletePart);
    }

    return new DateTestResult(false);
});

function RangeTest(secondPartTest) {
    this.secondPartTest = secondPartTest;
}

function RangeTestResult(matches, firstDate, secondDateTestResult) {
    if (matches && !secondDateTestResult) throw Error('No second result!');

    this.matches = matches && secondDateTestResult.matches;
    this.complete = matches && secondDateTestResult.complete;
    this.firstDate = firstDate;
    this.secondResult = secondDateTestResult;
}

function isRange(str) { return str.indexOf(RANGE_PARTS_SEP) > -1; }

RangeTest.prototype.test = function (str) {
    if (!isRange(str)) return new RangeTestResult(false);

    var parts = str.split(RANGE_PARTS_SEP);

    var firstDateResult = tests.year.test(parts[0].trim())

    if (firstDateResult.complete) {
        var dateData = firstDateResult.completePart;

        var firstDate = getDateIfValid(dateData.year, dateData.nr, dateData.day);

        if (firstDate) return new RangeTestResult(true, firstDate, this.secondPartTest.test(parts[1].trim()));
    }

    return new RangeTestResult(false);
};

tests.rangeYear = new RangeTest(tests.year);
tests.rangeMonth = new RangeTest(tests.month);
tests.rangeDay = new RangeTest(tests.day);

module.exports = {
    singleDayNumberFormat: new RegExp('^' + regExp.build('dayPart', 'sep', 'monthPart', 'sep', 'hoursPart') + '?' + '$'),
    singleDayWithYearFormat: new RegExp('^' + regExp.build('dayPart', 'sep', 'monthPart', 'sep', 'yearPart', 'hoursPart') + '?' + '$'),

    isRange: isRange,

    tests: tests
};
