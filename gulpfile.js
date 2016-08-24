var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano');

var sassSource = ['components/sass/**/*.scss'];
var cssDest = ['builds/developement/css'];

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
	browserSync.init({
		server: './'
	});

	gulp.watch(sassSource, ['sass']);
	gulp.watch('builds/developement/index.html').on('change', browserSync.reload);
});

// Compile sass into CSS then Auto prefixe & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src(sassSource)
		.pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['> 1%', 'last 10 versions'] }),cssnano()]))
		.pipe(gulp.dest(cssDest))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
