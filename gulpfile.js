const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const sassSource = ['components/sass/'];
const jsSource = ['components/scripts/'];
const outputDir = ['builds/development/'];

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], () => {
  browserSync.init({
    server: './'
  });

  gulp.watch(`${sassSource}*.scss`, ['sass']);
  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch(`${jsSource}*.js`, ['js']).on('change', browserSync.reload);
});

// Compile sass into CSS then Auto prefixe & auto-inject into browsers
gulp.task('sass', () =>
  gulp
    .src(`${sassSource}*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['> 1%', 'last 10 versions'] })]))
    .pipe(gulp.dest(`${outputDir}css`))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('builds/production/css'))
    .pipe(browserSync.stream())
);

gulp.task('js', () => {
  gulp.src(`${jsSource}*.js`).pipe(gulp.dest(`${outputDir}js`));
});

gulp.task('default', ['serve']);
