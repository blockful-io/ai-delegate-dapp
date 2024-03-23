export interface Proposal {
  id: string;
  name: string;
  txHash?: string;
  summary: string;
  status: "Executed" | "Queued" | "Defeated" | "Succeeded";
  proVotes: Vote[];
  conVotes: Vote[];
}

export interface Vote {
  id: string;
  address: string;
  votes: number;
}

export const getProposal = (id: string): Proposal => {
  // TODO: update this to fetch proposals from the blockchain
  // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/governance/Governor.sol

  console.log("getProposal", id);

  return {
    id: "1",
    name: "Proposal 1",
    status: "Executed",
    summary: "This is a summary of the proposal",
    txHash: "0x123",
    proVotes: [
      {
        id: "1",
        address: "Alice",
        votes: 1,
      },
      {
        id: "2",
        address: "Bob",
        votes: 2,
      },
    ],
    conVotes: [
      {
        id: "3",
        address: "Charlie",
        votes: 1,
      },
    ],
  };
};

export const getProposals = (): Proposal[] => {
  // TODO: update this to fetch proposals from the blockchain
  // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/contracts/governance/Governor.sol
  return [
    {
      id: "1",
      name: "Proposal 1",
      status: "Executed",
      summary: "This is a summary of the proposal",
      txHash: "0x123",
      proVotes: [
        {
          id: "1",
          address: "Alice",
          votes: 1,
        },
        {
          id: "2",
          address: "Bob",
          votes: 2,
        },
      ],
      conVotes: [
        {
          id: "3",
          address: "Charlie",
          votes: 1,
        },
      ],
    },
    {
      id: "2",
      name: "Proposal 2",
      status: "Succeeded",
      summary: "This is a summary of the proposal",
      proVotes: [
        {
          id: "4",
          address: "Alice",
          votes: 1,
        },
        {
          id: "5",
          address: "Bob",
          votes: 2,
        },
      ],
      conVotes: [
        {
          id: "6",
          address: "Charlie",
          votes: 1,
        },
      ],
    },
  ];
};
