const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: ['node_modules/bootstrap/dist/css/bootstrap.min.css', 'css/style.css'],
    dest: 'dist/css'
  },
  scripts: {
    src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    dest: 'dist/js'
  }
};

function styles() {
  return src(paths.styles.src)
    .pipe(concat('main.css'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest))
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

const build = parallel(styles, scripts);

exports.build = build;
exports.default = series(build, serve, watcher);