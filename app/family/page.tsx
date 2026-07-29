"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, Plus, Calendar, Trophy, Gift, CreditCard } from "lucide-react"

export default function FamilyAccountPage() {
  const [familyMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Primary Account Holder",
      email: "sarah.j@email.com",
      classesThisMonth: 12,
      avatar: "/placeholder.svg?key=sarah",
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "Family Member",
      email: "mike.j@email.com",
      classesThisMonth: 8,
      avatar: "/placeholder.svg?key=mike",
    },
    {
      id: 3,
      name: "Emma Johnson",
      role: "Family Member (Teen)",
      email: "emma.j@email.com",
      classesThisMonth: 6,
      avatar: "/placeholder.svg?key=emma",
    },
  ])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Family Account</h1>
          <p className="text-muted-foreground">Manage your family membership and track everyone's progress</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Family Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Family Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{familyMembers.length}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">26</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Family Discount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground">Savings this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Next Billing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$180</div>
            <p className="text-xs text-muted-foreground">Due Feb 1</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Family Members</CardTitle>
          <CardDescription>Manage access and track activity for each family member</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {familyMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <Badge variant="secondary" className="mt-1">
                          {member.role}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Classes this month</span>
                        <span className="text-muted-foreground">{member.classesThisMonth} / 20</span>
                      </div>
                      <Progress value={(member.classesThisMonth / 20) * 100} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Family Benefits</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Up to 5 Members</h4>
              <p className="text-sm text-muted-foreground">Add family members under one account</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">25% Discount</h4>
              <p className="text-sm text-muted-foreground">Save on additional family memberships</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Shared Class Credits</h4>
              <p className="text-sm text-muted-foreground">Pool and share class credits across family</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Family Challenges</h4>
              <p className="text-sm text-muted-foreground">Compete together in family yoga challenges</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
