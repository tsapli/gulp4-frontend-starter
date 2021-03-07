import config from './gulp/config';

config.setEnv();

export const build = () => {
  console.log(config.isProd);
};

export const watching = () => {
  console.log(config.isDev);
};
