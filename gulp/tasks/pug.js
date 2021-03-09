import { src, dest, watch } from 'gulp';
import pug from 'gulp-pug';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import { setup as emittySetup } from '@zoxon/emitty';
import debug from 'gulp-debug';
import config from '../config';

const emittyPug = emittySetup(config.src.pug, 'pug', {
  makeVinylFile: true,
});

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null,
};

export const pugBuild = () => (
  src(`${config.src.pug}/*.pug`)
    .pipe(plumber())
    .pipe(
      gulpif(
        global.watch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats,
        ),
      ),
    )
    .pipe(pug({ pretty: config.isDev }))
    .pipe(dest(config.dest.html))
    .pipe(debug({
      title: 'PUG files:',
    }))
    .pipe(browserSync.stream())
);

export const pugWatch = () => {
  global.watch = true;

  watch(`${config.src.pug}/**/*.pug`, pugBuild)
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats,
      };
    });
};
