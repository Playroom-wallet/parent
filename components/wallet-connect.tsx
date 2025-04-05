"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [ensName, setEnsName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConnect = () => {
    // Mock wallet connection
    setAddress("0x1234...5678")
    setIsConnected(true)
    setIsDialogOpen(false)
  }

  const handleDisconnect = () => {
    setAddress("")
    setEnsName("")
    setIsConnected(false)
  }

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-2">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {ensName || address}
          </div>
          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription>Connect your Polygon wallet and enter your ENS name to get started.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="ens">ENS Name (optional)</Label>
                <Input
                  id="ens"
                  placeholder="e.g., fam.eth"
                  value={ensName}
                  onChange={(e) => setEnsName(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleConnect}>Connect Wallet</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

