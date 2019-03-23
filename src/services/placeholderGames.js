const crypto = window.crypto.subtle;

export default async (count, seed) => {
  return Promise.all(
    [...Array(count).keys()].map(async index => {
      const teamSeed = new Uint32Array([seed, index, 0]);
      const opponentSeed = new Uint32Array([seed, index, 1]);

      return {
        team: {
          name: await placeholderTeamName(teamSeed)
        },
        opponent: {
          name: await placeholderTeamName(opponentSeed)
        },
        result: placeholderResult(teamSeed)
      };
    })
  );
};

const placeholderTeamName = async seed => {
  const randomInt = await consistentRandom(seed);
  return placeholderNames[randomInt % placeholderNames.length];
};

const placeholderResult = async seed => {
  const randomIntFor = await consistentRandom(seed);
  const randomIntAgainst = await consistentRandom(seed);
  return {
    pointsFor: randomIntFor % 20,
    pointsAgainst: randomIntAgainst % 20
  };
};

const placeholderNames = [
  'Penn St.',
  'Loyola Maryland',
  'Massachusetts',
  'Army West Point',
  'UMass Lowell',
  'North Carolina'
];

const consistentRandom = async seed => {
  const digest = await crypto.digest('SHA-1', seed);
  const view = new DataView(digest);

  return view.getInt32(0);
};
