'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiUrl: 'https://explorer-api.dev.sportnumerics.com'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
