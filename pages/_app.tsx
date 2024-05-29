import "@rainbow-me/rainbowkit/styles.css";
import "tailwindcss/tailwind.css";
import "./styles/globals.css";
import "./styles/fonts.css";
import {
  getSiweMessageOptions,
  queryClient,
  wagmiConfig,
} from "@/lib/wallet-config";
import { type AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { TheHeader } from "@/components/02-molecules";
import { QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";

import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <body className="w-full flex justify-center my-6">
      <WagmiProvider config={wagmiConfig}>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider
              getSiweMessageOptions={getSiweMessageOptions}
            >
              <RainbowKitProvider
                theme={lightTheme({
                  accentColor: "#000000",
                  accentColorForeground: "#B1FF6F",
                })}
              >
                <div className="max-w-[1024px] w-full h-screen min-w-[335px]">
                  <TheHeader />
                  <Toaster
                    toastOptions={{
                      style: {
                        background: "#333",
                        color: "#fff",
                      },
                    }}
                  />
                  <main className="max-w-[335px] w-full h-full flex flex-col items-center justify-between">
                    <Component {...pageProps} />
                  </main>
                </div>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </SessionProvider>
      </WagmiProvider>
    </body>
  );
}
