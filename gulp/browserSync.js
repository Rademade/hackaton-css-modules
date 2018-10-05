import { series } from 'gulp';
import bs from 'browser-sync';

const browserSync = () => {
  return bs.init({
    server: {
      baseDir: "./www"
    }
  });
};

export const buildBrowserSync = series(browserSync);
