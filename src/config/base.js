'use strict';

const STAGE = process.env.STAGE;

// Settings configured here will be merged into the final config object.
const stageConfig = {
  'dev': {
    gaTrackingId: 'UA-22349637-3',
    gaOptions: {
      debug: true
    }
  },
  'prod': {
    gaTrackingId: 'UA-22349637-1'
  }
};

export default stageConfig[STAGE]
