import { src, dest, watch } from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import browserSync from 'browser-sync';
import config from '../config';

export const stylesBuild = () => (
  src(`${config.src.sass}/main.scss`)
    .pipe(plumber())
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(config.isProd, rename({ suffix: '.min' })))
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(dest(config.dest.css))
    .pipe(debug({
      title: 'SCSS files',
    }))
    .pipe(browserSync.stream())
);

export const stylesWatch = () => watch(`${config.src.sass}/**/*.scss`, stylesBuild);
