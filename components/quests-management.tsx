"use client"

import { useState } from "react"
import { PlusCircle, CheckCircle2, XCircle, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { TokenIcon } from "./token-icon"

export function QuestsManagement() {
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Help mom cook",
      description: "Help prepare dinner for the family",
      reward: 5,
      token: "USDC",
      status: "pending",
      assignedTo: "leo.fam.eth",
      createdAt: "2 days ago",
    },
    {
      id: 2,
      title: "Clean your room",
      description: "Make your bed and organize your toys",
      reward: 3,
      token: "USDC",
      status: "completed",
      assignedTo: "leo.fam.eth",
      createdAt: "1 week ago",
    },
    {
      id: 3,
      title: "Take out the trash",
      description: "Empty all trash bins and take them to the curb",
      reward: 0.001,
      token: "cBTC",
      status: "approved",
      assignedTo: "leo.fam.eth",
      createdAt: "3 days ago",
    },
  ])

  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    reward: "",
    token: "USDC",
    assignedTo: "",
  })

  const [isAddingQuest, setIsAddingQuest] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const kids = [{ id: 1, name: "leo.fam.eth" }]

  const filteredQuests = quests.filter(
    (quest) =>
      quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quest.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingQuests = filteredQuests.filter((quest) => quest.status === "pending")
  const completedQuests = filteredQuests.filter((quest) => quest.status === "completed")
  const approvedQuests = filteredQuests.filter((quest) => quest.status === "approved")

  const handleAddQuest = () => {
    if (!newQuest.title || !newQuest.reward || !newQuest.assignedTo) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsAddingQuest(true)

    // Simulate adding a quest
    setTimeout(() => {
      const questToAdd = {
        id: quests.length + 1,
        title: newQuest.title,
        description: newQuest.description,
        reward: Number(newQuest.reward),
        token: newQuest.token as "USDC" | "cBTC",
        status: "pending",
        assignedTo: newQuest.assignedTo,
        createdAt: "Just now",
      }

      setQuests([questToAdd, ...quests])
      setNewQuest({
        title: "",
        description: "",
        reward: "",
        token: "USDC",
        assignedTo: "",
      })
      setIsAddingQuest(false)
      setIsDialogOpen(false)

      toast({
        title: "Quest created!",
        description: `Successfully created quest for ${questToAdd.assignedTo}`,
      })
    }, 1500)
  }

  const handleApproveQuest = (id: number) => {
    setQuests(quests.map((quest) => (quest.id === id ? { ...quest, status: "approved" } : quest)))

    toast({
      title: "Quest approved",
      description: "The reward has been sent to the kid's wallet",
    })
  }

  const handleRejectQuest = (id: number) => {
    setQuests(quests.map((quest) => (quest.id === id ? { ...quest, status: "pending" } : quest)))

    toast({
      title: "Quest rejected",
      description: "The quest has been returned to pending status",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quests</h2>
          <p className="text-muted-foreground">Create and manage quests for your kids</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Quest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new quest</DialogTitle>
              <DialogDescription>Add a new quest with a reward for your kid to complete</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="quest-title">Quest Title</Label>
                <Input
                  id="quest-title"
                  placeholder="e.g., Clean your room"
                  value={newQuest.title}
                  onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quest-description">Description (optional)</Label>
                <Input
                  id="quest-description"
                  placeholder="Describe what needs to be done"
                  value={newQuest.description}
                  onChange={(e) => setNewQuest({ ...newQuest, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quest-reward">Reward</Label>
                  <Input
                    id="quest-reward"
                    type="number"
                    placeholder="e.g., 5"
                    value={newQuest.reward}
                    onChange={(e) => setNewQuest({ ...newQuest, reward: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quest-token">Token</Label>
                  <Select value={newQuest.token} onValueChange={(value) => setNewQuest({ ...newQuest, token: value })}>
                    <SelectTrigger id="quest-token">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC" className="flex items-center">
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quest-assigned">Assign To</Label>
                <Select
                  onValueChange={(value) => setNewQuest({ ...newQuest, assignedTo: value })}
                  value={newQuest.assignedTo}
                >
                  <SelectTrigger id="quest-assigned">
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
            <DialogFooter>
              <Button
                onClick={handleAddQuest}
                disabled={isAddingQuest || !newQuest.title || !newQuest.reward || !newQuest.assignedTo}
              >
                {isAddingQuest ? "Creating..." : "Create Quest"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search quests..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Quests ({filteredQuests.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingQuests.length})</TabsTrigger>
          <TabsTrigger value="completed">Needs Approval ({completedQuests.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedQuests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {filteredQuests.length > 0 ? (
              filteredQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} onApprove={handleApproveQuest} onReject={handleRejectQuest} />
              ))
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">No quests found</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Your First Quest
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid gap-4">
            {pendingQuests.length > 0 ? (
              pendingQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} onApprove={handleApproveQuest} onReject={handleRejectQuest} />
              ))
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-10">
                  <p className="text-muted-foreground">No pending quests</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-4">
            {completedQuests.length > 0 ? (
              completedQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} onApprove={handleApproveQuest} onReject={handleRejectQuest} />
              ))
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-10">
                  <p className="text-muted-foreground">No quests waiting for approval</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="grid gap-4">
            {approvedQuests.length > 0 ? (
              approvedQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} onApprove={handleApproveQuest} onReject={handleRejectQuest} />
              ))
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-10">
                  <p className="text-muted-foreground">No approved quests</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Quest {
  id: number
  title: string
  description?: string
  reward: number
  token: "USDC" | "cBTC"
  status: "pending" | "completed" | "approved"
  assignedTo: string
  createdAt: string
}

interface QuestCardProps {
  quest: Quest
  onApprove: (id: number) => void
  onReject: (id: number) => void
}

function QuestCard({ quest, onApprove, onReject }: QuestCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{quest.title}</h3>
            {quest.description && <p className="text-muted-foreground text-sm mt-1">{quest.description}</p>}
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <span>
                Assigned to {quest.assignedTo} • {quest.createdAt}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="font-medium text-sm flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-md">
              {quest.token === "cBTC" ? (
                <>
                  <TokenIcon token="cBTC" className="mr-1" />
                  {quest.reward} cBTC
                </>
              ) : (
                <>
                  <TokenIcon token="USDC" className="mr-1" />
                  {quest.reward} USDC
                </>
              )}
            </div>
            <div
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                quest.status === "completed"
                  ? "bg-yellow-100 text-yellow-800"
                  : quest.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {quest.status === "completed" ? "Needs Approval" : quest.status === "approved" ? "Approved" : "Pending"}
            </div>

            {quest.status === "completed" && (
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-green-600"
                  onClick={() => onApprove(quest.id)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="sr-only">Approve</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-red-600"
                  onClick={() => onReject(quest.id)}
                >
                  <XCircle className="h-4 w-4" />
                  <span className="sr-only">Reject</span>
                </Button>
              </div>
            )}

            {quest.status !== "completed" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Quest</DropdownMenuItem>
                  <DropdownMenuItem>Delete Quest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

