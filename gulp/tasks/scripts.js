import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import debug from 'gulp-debug';
import browserSync from 'browser-sync';
import { argv } from 'yargs';
import webpackConfig from '../../webpack.config';
import config from '../config';

const production = !!argv.production;

webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

export const scriptsBuild = () => (
  src(`${config.src.js}/main.js`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpif(config.isProd, rename({ suffix: '.min' })))
    .pipe(dest(config.dest.js))
    .pipe(debug({
      title: 'JS files:',
    }))
    .pipe(browserSync.stream())
);

export const scriptsWatch = () => watch(`${config.src.js}/**/*.js`, scriptsBuild);
