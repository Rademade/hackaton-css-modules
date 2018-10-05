import { dest, src, series } from 'gulp';
import fs from 'fs';
import bs from 'browser-sync';
import postCss from 'gulp-postcss';

const generateJson = (cssFileName, json) => {
  const path          = require('path');
  const cssName       = path.basename(cssFileName, '.css');
  const jsonFileName  = path.resolve('./src/css-modules-sourcemaps/' + cssName + '.json');
  fs.writeFileSync(jsonFileName, JSON.stringify(json));
};

const plugins = [
  require('postcss-import')(),
  require('postcss-nested')(),
  require('postcss-modules')({ getJSON: generateJson }),
  require('postcss-cssnext')()
];

const css = () => {
  return src(['src/css/*.css'])
    .pipe(postCss(plugins, {}))
    .pipe(dest('www/css'))
    .pipe(bs.stream());
};

export const buildCss = series(css);
