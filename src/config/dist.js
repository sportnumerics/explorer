'use strict';

import baseConfig from './base';

const EXPLORER_API_URL = process.env.EXPLORER_API_URL;

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  apiUrl: EXPLORER_API_URL
};

export default Object.freeze(Object.assign({}, baseConfig, config));
