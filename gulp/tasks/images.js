import {
  src, dest, series, watch,
} from 'gulp';
import debug from 'gulp-debug';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import config from '../config';

const copyImages = () => (
  src(`${config.src.images}/**/*`)
    .pipe(changed(config.dest.images))
    .pipe(gulpif(config.isProd, imagemin([
      imagemin.mozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo(),
    ], {
      verbose: true,
    })))
    .pipe(dest(config.dest.images))
    .pipe(debug({
      title: 'IMAGES files:',
    }))
    .pipe(browserSync.stream())
);

const converImagesToWebp = () => (
  src(`${config.src.images}/**/*.{jpg,png}`)
    .pipe(changed(config.dest.images, { extension: '.webp' }))
    .pipe(imagemin([
      imageminWebp({ quality: 80 }),
    ]))
    .pipe(rename({ extname: '.webp' }))
    .pipe(dest(config.dest.images))
    .pipe(debug({
      title: 'IMAGES WEBP files:',
    }))
    .pipe(browserSync.stream())
);

export const imagesBuild = series(copyImages, converImagesToWebp);

export const imagesWatch = () => watch(`${config.src.images}/**/*`, imagesBuild);
