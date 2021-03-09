import { src, dest } from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import debug from 'gulp-debug';
import config from '../config';

export default function fontsBuild() {
  src(`${config.src.fonts}/*.ttf`)
    .pipe(ttf2woff())
    .pipe(dest(config.dest.fonts))
    .pipe(debug({
      title: 'TTF2WOFF files:',
    }));
  return src(`${config.src.fonts}/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(dest(config.dest.fonts))
    .pipe(debug({
      title: 'TTF2WOFF2 files:',
    }));
}
