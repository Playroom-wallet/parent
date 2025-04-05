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
          <h1 className="text-2xl font-bold">Playroom</h1>
          <WalletConnect />
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

