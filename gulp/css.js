import fs from 'fs';
import bs from 'browser-sync';
import postCss from 'gulp-postcss';
import { dest, src, series } from 'gulp';
import { fileManager } from 'gulp/utils/paths';

const generateJson = (cssFileName, json) => {
  const path          = require('path');
  const cssName       = path.basename(cssFileName, '.css');
  const jsonFileName  = path.resolve(fileManager.sourceMapsCss + cssName + '.json');
  fs.writeFileSync(jsonFileName, JSON.stringify(json));
};

const plugins = [
  require('postcss-import')(),
  require('postcss-nested')(),
  require('postcss-modules')({ getJSON: generateJson }),
  require('postcss-cssnext')()
];

const css = () => {
  return src([fileManager.sourceCss])
    .pipe(postCss(plugins, {}))
    .pipe(dest(fileManager.buildCss))
    .pipe(bs.stream());
};

export const buildCss = series(css);
