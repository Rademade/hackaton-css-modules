import bs from 'browser-sync';
import postHtml from 'gulp-posthtml';
import { dest, src, series } from 'gulp';
import { fileManager } from 'gulp/utils/paths';

const plugins = [
  require('posthtml-css-modules')(fileManager.sourceMapsCss + 'base.json')
];

const html = () => {
  return src([fileManager.sourceHtml])
    .pipe(postHtml(plugins))
    .pipe(dest(fileManager.build))
    .pipe(bs.stream());
};

export const buildHtml = series(html);
