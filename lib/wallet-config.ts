import {
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createPublicClient, createWalletClient } from "viem";
import { auroraTestnet, mainnet } from "viem/chains";
import { createConfig, http } from "wagmi";
import { QueryClient } from "@tanstack/react-query";

// Define the RPC URL for the blockchain
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

if (!RPC_URL) {
  throw new Error("RPC_URL is not defined");
}

// Create a public client for fetching data from the blockchain
export const publicClient = createPublicClient({
  chain: auroraTestnet,
  batch: { multicall: true },
  transport: http(),
});

// Create a wallet client for sending transactions to the blockchain
export const walletClient = createWalletClient({
  chain: auroraTestnet,
  transport: http(RPC_URL),
});

// Create a app config for Wagmi
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!projectId) throw new Error("No WalletConnect project ID defined");
const appName = "AI Delegates";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Select a wallet to connect",
      wallets: [metaMaskWallet, trustWallet, rainbowWallet],
    },
  ],
  {
    projectId,
    appName,
  }
);
const wagmiConfig = createConfig({
  connectors,
  chains: [auroraTestnet],
  transports: {
    [auroraTestnet.id]: http(RPC_URL),
  },
});

const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL;

const mainnetChainConfig = createConfig({
  connectors,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(MAINNET_RPC_URL),
  },
});

// Create a app config for Siwe (Wallet Authentication)
const getSiweMessageOptions = () => ({
  statement: "Connect to AI Delegates",
});

// Create a query client for fetching data
const queryClient = new QueryClient();

export { wagmiConfig, getSiweMessageOptions, queryClient, mainnetChainConfig };
