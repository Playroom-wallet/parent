"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface DeployRegistrarProps {
  onSuccess: () => void
}

export function DeployRegistrar({ onSuccess }: DeployRegistrarProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [ensName, setEnsName] = useState("")
  const { toast } = useToast()

  const handleDeploy = async () => {
    if (!ensName) {
      toast({
        title: "ENS name required",
        description: "Please enter your ENS name to deploy the registrar",
        variant: "destructive",
      })
      return
    }

    setIsDeploying(true)

    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false)
      toast({
        title: "Registrar deployed!",
        description: `Successfully deployed registrar for ${ensName}`,
      })
      onSuccess()
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ens-name">Your ENS Name</Label>
        <Input id="ens-name" placeholder="e.g., fam.eth" value={ensName} onChange={(e) => setEnsName(e.target.value)} />
        <p className="text-sm text-muted-foreground">This will be used as the parent domain for your kids' wallets</p>
      </div>

      <Button onClick={handleDeploy} disabled={isDeploying || !ensName} className="w-full">
        {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isDeploying ? "Deploying..." : "Deploy Durin Registrar"}
      </Button>
    </div>
  )
}

