import { watch, parallel, series, src, dest } from 'gulp';
import fs from 'fs';
import bs from 'browser-sync';
const posthtml = require('gulp-posthtml');
const postCss = require('gulp-postcss');

const browserSync = () => {
  return bs.init({
    server: {
      baseDir: "./www"
    }
  });
};

const buildCss = () => {
  return src(['src/css/*.css'])
    .pipe (postCss([
      require('postcss-import')(),
      require('postcss-nested')(),
      require('postcss-modules')({
        getJSON: function(cssFileName, json, outputFileName) {
          const path          = require('path');
          const cssName       = path.basename(cssFileName, '.css');
          const jsonFileName  = path.resolve('./src/css-modules-sourcemaps/' + cssName + '.json');
          fs.writeFileSync(jsonFileName, JSON.stringify(json));
        }
      }),
      require('postcss-cssnext')()
    ], {}))
    .pipe(dest('www/css'))
    .pipe(bs.stream());
};

const buildHtml = () => {
  return src(['src/html/*.html'])
    .pipe(posthtml([require('posthtml-css-modules')('./src/css-modules-sourcemaps/base.json')]))
    .pipe(dest('www'))
    .pipe(bs.stream());
};


export const devWatch = () => {
  watch('src/css/*.css', series(buildCss));
  watch('src/html/*.html', series(buildHtml));
};

// tasks build
export const dev = series(
  buildCss,
  buildHtml,
  parallel(devWatch, browserSync)
);

export default dev;
