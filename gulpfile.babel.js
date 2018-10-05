import { watch, parallel, series } from 'gulp';
import { buildCss } from './gulp/css';
import { buildHtml } from './gulp/html';
import { buildBrowserSync } from './gulp/browserSync';
import { fileManager } from 'gulp/utils/paths';

export const devWatch = () => {
  watch(fileManager.watchCss, series(buildCss));
  watch(fileManager.watchHtml, series(buildHtml));
};

export const dev = series(
  buildCss,
  buildHtml,
  parallel(devWatch, buildBrowserSync)
);

export default dev;
