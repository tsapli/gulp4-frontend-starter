import { src, dest } from 'gulp';
import favicons from 'gulp-favicons';
import debug from 'gulp-debug';
import config from '../config';

const faviconsBuild = () => (
  src(`${config.src.favicons}/*.{jpg,jpeg,png,gif}`)
    .pipe(favicons({
      icons: {
        appleIcon: false,
        favicons: true,
        online: false,
        appleStartup: false,
        android: false,
        firefox: false,
        yandex: false,
        windows: false,
        coast: false,
      },
    }))
    .pipe(dest(`${config.dest.images}/favicons`))
    .pipe(debug({
      title: 'FAVICONS files:',
    }))
);
export default faviconsBuild;
