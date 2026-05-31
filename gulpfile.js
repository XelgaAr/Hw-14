const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function styles() {
  return src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'css/style.css'
  ])
  .pipe(concat('main.css'))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream());
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  done();
}

function watcher() {
  watch('css/style.css', series(styles));
  watch('*.html').on('change', browserSync.reload);
}

exports.default = series(styles, serve, watcher);