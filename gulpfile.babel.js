import { series, parallel } from 'gulp';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import config from './gulp/config';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';

config.setEnv();

export const build = series(
  clean,
  parallel(
    pugBuild,
    scriptsBuild,
  ),
);

export const watching = series(
  build,
  server,
  parallel(
    pugWatch,
    scriptsWatch,
  ),
);
