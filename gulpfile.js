var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

var sassSource = ['components/sass/']
var jsSource = ['components/scripts/']
var outputDir = ['builds/development/']

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function () {
  browserSync.init({
    server: './'
  })

  gulp.watch(sassSource + '*.scss', ['sass'])
  gulp.watch('index.html').on('change', browserSync.reload)
  gulp.watch(jsSource + '*.js', ['js']).on('change', browserSync.reload)
})

// Compile sass into CSS then Auto prefixe & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src(sassSource + '*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['> 1%', 'last 10 versions'] })]))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('builds/production/css'))
    .pipe(browserSync.stream())
})

gulp.task('js', function () {
  gulp.src(jsSource + 'app.js')
    .pipe(gulp.dest(outputDir + 'js'))
})

gulp.task('default', ['serve'])
