"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function CreateKidForm() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [kidName, setKidName] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!kidName) {
      toast({
        title: "Name required",
        description: "Please enter a name for the kid",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    // Simulate creating a kid account
    setTimeout(() => {
      setIsCreating(false)
      toast({
        title: "Kid added!",
        description: `Successfully created ${kidName}.fam.eth`,
      })
      router.push("/kids")
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
          <h2 className="text-2xl font-bold tracking-tight">Add New Kid</h2>
          <p className="text-muted-foreground">Create a new kid account with an ENS subname</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Kid Details</CardTitle>
            <CardDescription>Create a new kid subname that will be linked to a new wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kid-name">
                Kid Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="kid-name"
                placeholder="e.g., leo"
                value={kidName}
                onChange={(e) => setKidName(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                This will create {kidName ? `${kidName}.fam.eth` : "[name].fam.eth"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Kid Account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

