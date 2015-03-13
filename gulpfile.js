'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha'),
    del = require('del'),
    node2angular = require('gulp-node-to-angular-service');

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return version + '.' + name + '.' + 'min';
};

gulp.task('browserify', ['clean-dist'], function () {
  // transform regular node stream to gulp (buffered vinyl) stream
  var browserified = transform(function(filename) {
    var b = browserify();
    b.add(filename);
    return b.bundle();
  });

  return gulp.src('./src/format.js')
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('angular-service', ['clean-dist'], function () {
    return gulp.src('./src/format.js')
        .pipe(node2angular({moduleName: 'cibernosis', serviceName: 'dateParser'}))
        .pipe(rename('dateParserService.js'))
        .pipe(gulp.dest('./dist/angular/'));
});

gulp.task('clean-dist', function () {
    return del(['dist/']);
})

gulp.task('dist', ['clean-dist', 'browserify', 'angular-service']);

gulp.task('test', function () {
    return gulp.src(['test/test*.js'], {read: false})
        .pipe(mocha());
});

gulp.task('watch-test', function () {
    gulp.watch(['src/**', 'test/**'], ['test']);
})

gulp.task('watch', ['watch-test']);

gulp.task('default', ['dist']);
