import bs from 'browser-sync';
import { series } from 'gulp';
import { fileManager } from 'gulp/utils/paths';

const browserSync = () => {
  return bs.init({
    server: {
      baseDir: fileManager.baseDir
    }
  });
};

export const buildBrowserSync = series(browserSync);
