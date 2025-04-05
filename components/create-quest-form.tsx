


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { TokenIcon } from "./token-icon"

export function CreateQuestForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedKid = searchParams.get("kid") || ""

  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    token: "USDC",
    assignedTo: preselectedKid,
  })

  const { toast } = useToast()

  // Mock kids data - in a real app, this would come from your database
  const kids = [
    { id: 1, name: "leo.fam.eth" },
    { id: 2, name: "emma.fam.eth" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.reward || !formData.assignedTo) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    // Simulate creating a quest
    setTimeout(() => {
      setIsCreating(false)
      toast({
        title: "Quest created!",
        description: `Successfully created quest for ${formData.assignedTo}`,
      })
      router.push("/quests")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create New Quest</h2>
          <p className="text-muted-foreground">Create a new quest with rewards for your kid</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Quest Details</CardTitle>
            <CardDescription>
              Fill in the details for the new quest. Be specific about what needs to be done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Quest Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Clean your room"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what needs to be done in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Provide clear instructions so your kid knows exactly what to do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reward">
                  Reward <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reward"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token">
                  Token <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.token} onValueChange={(value) => setFormData({ ...formData, token: value })}>
                  <SelectTrigger id="token">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">
                      <div className="flex items-center">
                        <TokenIcon token="USDC" className="mr-2" />
                        USDC
                      </div>
                    </SelectItem>
                    <SelectItem value="cBTC">
                      <div className="flex items-center">
                        <TokenIcon token="cBTC" className="mr-2" />
                        cBTC
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">
                  Assign To <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.assignedTo}
                  onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
                  required
                >
                  <SelectTrigger id="assignedTo">
                    <SelectValue placeholder="Select a kid" />
                  </SelectTrigger>
                  <SelectContent>
                    {kids.map((kid) => (
                      <SelectItem key={kid.id} value={kid.name}>
                        {kid.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Quest"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
