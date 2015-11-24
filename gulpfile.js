'use strict';

const 	env = process.env.NODE_ENV,
		gulp = require('gulp'),
		cache = require('gulp-cache'),
		clean = require('gulp-clean'),
		stream = require('event-stream'),
		browserSync = require('browser-sync'),
		browserify = require('browserify'),
		babelify = require('babelify'),
		source = require('vinyl-source-stream'),
		size = require('gulp-size'),
		jshint = require('gulp-jshint'),
		concat = require('gulp-concat'),
		minifyCSS = require('gulp-minify-css'),
		base64 = require('gulp-base64'),
		less = require('gulp-less'),
		jade = require('gulp-jade'),
		rename = require('gulp-rename'),
		notify = require("gulp-notify"),
		pluginAutoprefix = require('less-plugin-autoprefix');

const autoprefix = new pluginAutoprefix({ browsers: ["iOS >= 7", "Safari >= 6", "Chrome >= 40"] });

gulp.task('html', () => {
	let localsObject = {};

	gulp.src('source/views/*.jade')
	.pipe(jade({
	  locals: localsObject
	}))
	.pipe(gulp.dest(''))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('styles', () => {
	return gulp.src('source/less/style.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.on("error", notify.onError({
			message: 'LESS compile error: <%= error.message %>'
		}))
		.pipe(base64({
			extensions: ['jpg', 'png', 'svg'],
			maxImageSize: 32*1024 
		}))
		.pipe(minifyCSS({
			keepBreaks: false 
		}))
		.pipe(gulp.dest('css'))
		.pipe(size({
			title: 'size of styles'
		}))
		.pipe(browserSync.reload({stream:true}));
});
 
gulp.task('scripts', () => {
	return browserify('source/js/app.js', {
			debug: env === "development" ? true : false
		})
		.transform(babelify, {presets: ["es2015", "react"]})
		.bundle()
		.on("error", notify.onError({
			message: 'Browserify error: <%= error.message %>'
		}))
		.pipe(source('application.js'))
		.pipe(gulp.dest('js'))
		.pipe(size({
			title: 'size of modules'
		}))
		.pipe(browserSync.reload({stream:true, once: true}));
});
 
gulp.task('clean', () => {
  return gulp.src(['css', 'js', '*.html'], {read: false})
	.pipe(clean());
});
 
gulp.task('clear', (done) => {
  return cache.clearAll(done);
});
 
gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});
 
gulp.task('watch', ['browser-sync'], () => {
	gulp.watch('source/views/**/*.jade', ['html']);
	gulp.watch('source/js/**/*.js', ['scripts']);
	gulp.watch('source/less/**/*.less', ['styles']);
});
 
gulp.task('default', ['clean', 'clear'], () => {
	gulp.start('styles', 'scripts', 'html');
});