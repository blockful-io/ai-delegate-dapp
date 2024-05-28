import {
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createPublicClient, createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";
import { QueryClient } from "@tanstack/react-query";
import { GetSiweMessageOptions } from "@rainbow-me/rainbowkit-siwe-next-auth";

// Define the RPC URL for the blockchain
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

if (!RPC_URL) {
  throw new Error("RPC_URL is not defined");
}

// Create a public client for fetching data from the blockchain
export const publicClient = createPublicClient({
  chain: sepolia,
  batch: { multicall: true },
  transport: http(),
});

// Create a wallet client for sending transactions to the blockchain
export const walletClient = createWalletClient({
  chain: sepolia,
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
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(RPC_URL),
  },
  ssr: true,
});

// Create a app config for Siwe (Wallet Authentication)
const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Connect to AI Delegates",
});

const queryClient = new QueryClient();

export { wagmiConfig, getSiweMessageOptions, queryClient };
