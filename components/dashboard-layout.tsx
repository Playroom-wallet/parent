"use client"

import type { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { WalletConnect } from "@/components/wallet-connect"

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-8">
          <img src="/images/playroom_logo.svg" alt="Playroom Logo" className="h-24 w-24" />
          <WalletConnect />
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

