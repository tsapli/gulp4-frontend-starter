import { series, parallel } from 'gulp';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import config from './gulp/config';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites';
import faviconsBuild from './gulp/tasks/favicons';
import fontsBuild from './gulp/tasks/fonts';

config.setEnv();

export const build = series(
  clean,
  parallel(
    pugBuild,
    scriptsBuild,
    stylesBuild,
    imagesBuild,
    spritesBuild,
    fontsBuild,
    faviconsBuild,
  ),
);

export const watching = series(
  build,
  server,
  parallel(
    pugWatch,
    scriptsWatch,
    stylesWatch,
    imagesWatch,
    spritesWatch,
  ),
);
