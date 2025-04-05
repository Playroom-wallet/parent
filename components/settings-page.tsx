"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function SettingsPage() {
  const [settings, setSettings] = useState({
    ensName: "fam.eth",
    emailNotifications: true,
    autoApproval: false,
    maxReward: "10"
  })
  
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    setIsSaving(true)
    
    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your ENS name and wallet settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ens-name">ENS Name</Label>
              <Input 
                id="ens-name" 
                value={settings.ensName}
                onChange={(e) => setSettings({...settings, ensName: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                This is the parent domain for your kids' wallets
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications when a quest is completed
                </p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quest Settings</CardTitle>
            <CardDescription>
              Configure how quests work for your kids
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-approval">Auto-Approval</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically approve quests when marked as completed
                </p>
              </div>
              <Switch 
                id="auto-approval" 
                checked={settings.autoApproval}
                onCheckedChange={(checked) => setSettings({...settings, autoApproval: checked})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-reward">Maximum Reward (USDC)</Label>
              <Input 
                id="max-reward" 
                type="number"
                value={settings.maxReward}
                onChange={(e) => setSettings({...settings, maxReward: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                Maximum reward amount that can be set for a single quest
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveSettings} 
              disabled={isSaving}
              className="ml-auto"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

