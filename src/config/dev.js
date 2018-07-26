'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiUrl: 'https://explorer-api-green.sportnumerics.com',
  gitSha: 'dev',
  appStage: 'dev',
  nodeEnv: 'dev'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
