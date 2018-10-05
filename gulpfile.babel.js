import { watch, parallel, series } from 'gulp';
import { buildCss } from './gulp/css';
import { buildHtml } from './gulp/html';
import { buildBrowserSync } from './gulp/browserSync';

export const devWatch = () => {
  watch('src/css/*.css', series(buildCss));
  watch('src/html/*.html', series(buildHtml));
};

export const dev = series(
  buildCss,
  buildHtml,
  parallel(devWatch, buildBrowserSync)
);

export default dev;
