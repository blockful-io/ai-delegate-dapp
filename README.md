# AI DELEGATE

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/blockful-io/ai-delegates.git
cd AI-DELEGATES
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a third terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a fourth terminal, start the server:

```

yarn server start

```

5. On a fifth terminal, start your NextJS app:

```

yarn start

```

Visit your app on: `http://localhost:3001`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `Governor.sol` in `packages/hardhat/contracts`
- Edit your smart contract `Token.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

- Sepolia

  - [token: 0xcd99AA11b9aB73Bdd06c4dACB20C3616DA57f3B0](https://sepolia.etherscan.io/address/0xcd99AA11b9aB73Bdd06c4dACB20C3616DA57f3B0)
  - [governor: 0xdCf5B18976cA5074b7702aAEf7b083E7c917ad4E](https://sepolia.etherscan.io/address/0xdCf5B18976cA5074b7702aAEf7b083E7c917ad4E)

- Aurora Testnet

  - token: [0x71659658aa5656d94598F688dFC39bEd66B933b5](https://explorer.testnet.aurora.dev/address/0x71659658aa5656d94598F688dFC39bEd66B933b5)
  - governor: [0x61B16fED56534Ec01c31228E1AcB65b56cf3eD61](https://explorer.testnet.aurora.dev/address/0x61B16fED56534Ec01c31228E1AcB65b56cf3eD61)

- Scroll Sepolia

  - token: [0x71659658aa5656d94598F688dFC39bEd66B933b5](https://sepolia.scrollscan.com/address/0x71659658aa5656d94598F688dFC39bEd66B933b5)
  - governor: [0x61B16fED56534Ec01c31228E1AcB65b56cf3eD61](https://sepolia.scrollscan.com/address/0x61B16fED56534Ec01c31228E1AcB65b56cf3eD61)
