'use strict';

import baseConfig from './base';

const EXPLORER_API_URL = process.env.EXPLORER_API_URL;
const GIT_SHA = process.env.GIT_SHA;
const STAGE = process.env.STAGE;
const NODE_ENV = process.env.NODE_ENV;

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  apiUrl: EXPLORER_API_URL,
  gitSha: GIT_SHA,
  appStage: STAGE,
  nodeEnv: NODE_ENV
};

export default Object.freeze(Object.assign({}, baseConfig, config));
