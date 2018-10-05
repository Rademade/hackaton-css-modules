import { dest, src, series } from 'gulp';
import bs from 'browser-sync';
import postHtml from 'gulp-posthtml';

const html = () => {
  return src(['src/html/*.html'])
    .pipe(postHtml([require('posthtml-css-modules')('./src/css-modules-sourcemaps/base.json')]))
    .pipe(dest('www'))
    .pipe(bs.stream());
};

export const buildHtml = series(html);
