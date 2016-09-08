var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano');

var sassSource = ['components/sass/**/*.scss'];
var outputDir = ['builds/developement/'];

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function () {
	browserSync.init({
		server: outputDir
	});

	gulp.watch(sassSource, ['sass']);
	gulp.watch('builds/developement/index.html').on('change', browserSync.reload);
});

// Compile sass into CSS then Auto prefixe & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src(sassSource)
		.pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['> 1%', 'last 10 versions'] }),cssnano()]))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(browserSync.stream());
});

gulp.task('js', function() {
	gulp.src('components/scripts/app.js')
	.pipe(gulp.dest(outputDir + 'js'));
});


gulp.task('default', ['serve']);
