import { WagmiProvider } from "wagmi";
import { type AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  getSiweMessageOptions,
  queryClient,
  wagmiConfig,
} from "../lib/wallet-config";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { TheHeader } from "@/components/02-molecules";

import "@rainbow-me/rainbowkit/styles.css";
import "@/public/output.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider
              theme={lightTheme({
                accentColor: "black",
                borderRadius: "small",
                overlayBlur: "small",
              })}
            >
              <div className="flex justify-center my-6 mx-5">
                <div className="max-w-[1024px] w-full h-screen min-w-[335px]">
                  <main className="w-full flex flex-col items-center justify-between">
                    <TheHeader />
                    <Component {...pageProps} />
                  </main>
                </div>
              </div>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
