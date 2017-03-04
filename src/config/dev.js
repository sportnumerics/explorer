'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiUrl: 'https://fcbbar7gk0.execute-api.ap-southeast-2.amazonaws.com/dev'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
