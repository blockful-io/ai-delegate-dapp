// TODO: update once BackEnd is ready
// const GET_AIS_URL = "https://api.wagmi.io/ai";

export interface AI {
  id: string;
  name: string;
  bias: string;
  votingPower: number;
  biasSummary: string;
  delegatedVotes: {
    delegate: string;
    votes: number;
  }[];
}

export const getAI = (id: string): AI => {
  // TODO: update once BackEnd is ready
  // const response = await fetch(GET_AI_URL);
  // const data = await response.json();
  // return data;

  console.log(id);

  return {
    id: "1",
    name: "Automatically added AI",
    bias: "I am automatically added because I am cool",
    votingPower: 200,
    biasSummary: "I am cool",
    delegatedVotes: [
      {
        delegate: "Satoshi Nakamoto",
        votes: 100,
      },
    ],
  };
};

export const getAIs = (): AI[] => {
  // TODO: update once BackEnd is ready
  // const response = await fetch(GET_AIS_URL);
  // const data = await response.json();
  // return data;

  return [
    {
      id: "1",
      name: "Automatically added AI",
      bias: "I am automatically added because I am cool",
      votingPower: 200,
      biasSummary: "I am cool",
      delegatedVotes: [
        {
          delegate: "Satoshi Nakamoto",
          votes: 100,
        },
      ],
    },
    {
      id: "2",
      name: "Crazy AI",
      bias: "I am crazy because I just am",
      votingPower: 400,
      biasSummary: "I am crazy",
      delegatedVotes: [
        {
          delegate: "God",
          votes: 100,
        },
      ],
    },
  ];
};
