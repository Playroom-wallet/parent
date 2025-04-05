"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  citreaTestnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] })

const config = getDefaultConfig({
  appName: 'playroom',
  projectId: '2fcf4efc4ba776806bc3a706cb780154',
  chains: [citreaTestnet],
  ssr: true,
});

// const metadata = {
//   title: "Playroom - A Wallet for Kids",
//   description: "Help kids learn about digital finance through quests and rewards",
//     generator: 'v0.dev'
// }
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </html>
  )
}
