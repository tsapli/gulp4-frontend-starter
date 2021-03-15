import {
  src, dest, series, watch,
} from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import browserSync from 'browser-sync';
import smartGrid from 'smart-grid';
import importFresh from 'import-fresh';
import sassGlob from 'gulp-sass-glob';
import config from '../config';

const SMART_GRID_CONFIG_NAME = 'smart-grid-config.js';

const sassBuild = () => (
  src(`${config.src.sass}/main.scss`, { sourcemaps: config.isDev })
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['./node_modules'],
    }))
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(config.dest.css, { sourcemaps: config.isDev }))
    .pipe(debug({
      title: 'SCSS files:',
    }))
    .pipe(browserSync.stream())
);

const smartGridBuild = (cb) => {
  const smartGridConfig = importFresh(`../../${SMART_GRID_CONFIG_NAME}`);
  smartGrid(`${config.src.sass}/generated`, smartGridConfig);

  cb();
};

export const stylesBuild = series(smartGridBuild, sassBuild);

export const stylesWatch = () => {
  watch(`${config.src.sass}/**/*.scss`, sassBuild);
  watch(`./${SMART_GRID_CONFIG_NAME}`, smartGridBuild);
};
