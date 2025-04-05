"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Trash2, Edit, MoreHorizontal, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function KidsManagement() {
  const [kids, setKids] = useState([
    {
      id: 1,
      name: "leo",
      fullName: "leo.fam.eth",
      avatar: "👦",
      walletAddress: "0xabcd...1234",
      completedQuests: 3,
      totalQuests: 5,
      balance: 8,
    },
  ])

  const [newKidName, setNewKidName] = useState("")
  const [isAddingKid, setIsAddingKid] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleAddKid = () => {
    if (!newKidName) {
      toast({
        title: "Name required",
        description: "Please enter a name for the kid",
        variant: "destructive",
      })
      return
    }

    setIsAddingKid(true)

    // Simulate adding a kid
    setTimeout(() => {
      const newKid = {
        id: kids.length + 1,
        name: newKidName,
        fullName: `${newKidName}.fam.eth`,
        avatar: "👧",
        walletAddress: "0xefgh...5678",
        completedQuests: 0,
        totalQuests: 0,
        balance: 0,
      }

      setKids([...kids, newKid])
      setNewKidName("")
      setIsAddingKid(false)
      setIsDialogOpen(false)

      toast({
        title: "Kid added!",
        description: `Successfully created ${newKid.fullName}`,
      })
    }, 1500)
  }

  const handleDeleteKid = (id: number) => {
    setKids(kids.filter((kid) => kid.id !== id))
    toast({
      title: "Kid removed",
      description: "The kid has been removed from your account",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kids</h2>
          <p className="text-muted-foreground">Manage your kids' accounts and wallets</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Kid
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a kid account</DialogTitle>
              <DialogDescription>Add a new kid subname that will be linked to a new wallet</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="kid-name">Kid Name</Label>
                <Input
                  id="kid-name"
                  placeholder="e.g., leo"
                  value={newKidName}
                  onChange={(e) => setNewKidName(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This will create {newKidName ? `${newKidName}.fam.eth` : "[name].fam.eth"}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddKid} disabled={isAddingKid || !newKidName}>
                {isAddingKid ? "Creating..." : "Create Kid Account"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kids.map((kid) => (
          <Card key={kid.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                    <span className="text-lg">{kid.avatar}</span>
                  </div>
                  <div>
                    <CardTitle>{kid.fullName}</CardTitle>
                    <CardDescription>{kid.walletAddress}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteKid(kid.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Quests</p>
                  <p className="font-medium">
                    {kid.completedQuests}/{kid.totalQuests} completed
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <div className="font-medium flex items-center">
                    <Wallet className="mr-1 h-3 w-3" />
                    {kid.balance} USDC
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/quests/new?kid=${kid.fullName}`}>
                    <PlusCircle className="mr-2 h-3 w-3" />
                    Create Quest
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {kids.length === 0 && (
          <Card className="col-span-full border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No kids added yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Kid
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

