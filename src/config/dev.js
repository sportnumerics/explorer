'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev', // feel free to remove the appEnv property here
  apiUrl: 'https://explorer-api-green.sportnumerics.com',
  // apiUrl: 'http://localhost:3000',
  gitSha: 'dev',
  appStage: process.env.STAGE,
  nodeEnv: process.env.NODE_ENV
};

export default Object.freeze(Object.assign({}, baseConfig, config));
