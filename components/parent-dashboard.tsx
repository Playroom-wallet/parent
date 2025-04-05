"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, CheckSquare, ArrowRight, PlusCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DeployRegistrar } from "@/components/deploy-registrar"
import { TokenIcon } from "./token-icon"

export function ParentDashboard() {
  const [isRegistrarDeployed, setIsRegistrarDeployed] = useState(false)
  const [kids, setKids] = useState([{ id: 1, name: "leo.fam.eth", avatar: "👦", completedQuests: 3, totalQuests: 5 }])

  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Help mom cook",
      reward: 5,
      token: "USDC",
      status: "pending",
      assignedTo: "leo.fam.eth",
      createdAt: "2 days ago",
    },
    {
      id: 2,
      title: "Clean your room",
      reward: 3,
      token: "USDC",
      status: "completed",
      assignedTo: "leo.fam.eth",
      createdAt: "1 week ago",
    },
    {
      id: 3,
      title: "Take out the trash",
      reward: 0.001,
      token: "cBTC",
      status: "approved",
      assignedTo: "leo.fam.eth",
      createdAt: "3 days ago",
    },
  ])

  const pendingApprovalQuests = quests.filter((quest) => quest.status === "completed")

  const handleDeploySuccess = () => {
    setIsRegistrarDeployed(true)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Kids</CardTitle>
            <CardDescription>Manage your kids' accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{kids.length}</div>
            <p className="text-sm text-muted-foreground">Active accounts</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/kids">
                <span>View all</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quests</CardTitle>
            <CardDescription>Track and manage quests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{quests.length}</div>
            <p className="text-sm text-muted-foreground">Total quests</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/quests">
                <span>View all</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Pending Approvals</CardTitle>
            <CardDescription>Quests waiting for your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingApprovalQuests.length}</div>
            <p className="text-sm text-muted-foreground">Quests to review</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/quests?filter=pending">
                <span>Review</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {!isRegistrarDeployed && (
        <Card className="border-dashed border-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
              Get Started
            </CardTitle>
            <CardDescription>Deploy your Durin-compatible registrar to start creating kid accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <DeployRegistrar onSuccess={handleDeploySuccess} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Kids
            </CardTitle>
          </CardHeader>
          <CardContent>
            {kids.length > 0 ? (
              <div className="space-y-4">
                {kids.map((kid) => (
                  <div key={kid.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                        <span>{kid.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{kid.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>
                            {kid.completedQuests} of {kid.totalQuests} quests completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress value={(kid.completedQuests / kid.totalQuests) * 100} className="w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No kids added yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/kids/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Kid
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              Recent Quests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quests.length > 0 ? (
              <div className="space-y-4">
                {quests.map((quest) => (
                  <div key={quest.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{quest.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>
                          Assigned to {quest.assignedTo} • {quest.createdAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 text-sm font-medium flex items-center">
                        <TokenIcon token={quest.token as "USDC" | "cBTC"} className="mr-1" />
                        {quest.reward} {quest.token}
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          quest.status === "completed"
                            ? "bg-yellow-100 text-yellow-800"
                            : quest.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {quest.status === "completed"
                          ? "Needs Approval"
                          : quest.status === "approved"
                            ? "Approved"
                            : "Pending"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No quests created yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/quests/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Quest
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

