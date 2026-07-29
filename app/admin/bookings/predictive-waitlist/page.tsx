"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PredictiveWaitlistPage() {
  const [autoFillEnabled, setAutoFillEnabled] = useState(true)

  const waitlistClasses = [
    {
      id: 1,
      name: "Power Vinyasa",
      time: "Monday 6:00 PM",
      instructor: "Sarah Chen",
      capacity: 25,
      booked: 25,
      waitlist: 8,
      noShowPrediction: 3,
      autoFillCount: 3,
      confidence: 87,
    },
    {
      id: 2,
      name: "Hot Yoga",
      time: "Wednesday 7:30 PM",
      instructor: "Michael Torres",
      capacity: 20,
      booked: 20,
      waitlist: 5,
      noShowPrediction: 2,
      autoFillCount: 2,
      confidence: 92,
    },
    {
      id: 3,
      name: "Restorative Yoga",
      time: "Friday 8:00 PM",
      instructor: "Emma Wilson",
      capacity: 15,
      booked: 15,
      waitlist: 3,
      noShowPrediction: 1,
      autoFillCount: 1,
      confidence: 78,
    },
  ]

  const waitlistMembers = [
    {
      id: 1,
      name: "Lisa Anderson",
      position: 1,
      addedAt: "2 hours ago",
      autoFillProbability: 95,
      attendanceRate: "98%",
      status: "likely",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "David Kim",
      position: 2,
      addedAt: "3 hours ago",
      autoFillProbability: 87,
      attendanceRate: "92%",
      status: "likely",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Rachel Green",
      position: 3,
      addedAt: "4 hours ago",
      autoFillProbability: 65,
      attendanceRate: "85%",
      status: "possible",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Tom Harris",
      position: 4,
      addedAt: "5 hours ago",
      autoFillProbability: 42,
      attendanceRate: "78%",
      status: "unlikely",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const noShowPatterns = [
    { day: "Monday", rate: 12, avg: 8 },
    { day: "Tuesday", rate: 6, avg: 8 },
    { day: "Wednesday", rate: 9, avg: 8 },
    { day: "Thursday", rate: 7, avg: 8 },
    { day: "Friday", rate: 14, avg: 8 },
    { day: "Saturday", rate: 5, avg: 8 },
    { day: "Sunday", rate: 4, avg: 8 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Predictive Waitlist Management</h1>
          <p className="text-muted-foreground">AI anticipates no-shows and automatically fills spots</p>
        </div>
        <Button variant={autoFillEnabled ? "default" : "outline"} onClick={() => setAutoFillEnabled(!autoFillEnabled)}>
          {autoFillEnabled ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <AlertCircle className="mr-2 h-4 w-4" />}
          Auto-Fill {autoFillEnabled ? "Enabled" : "Disabled"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Waitlisted</CardDescription>
            <CardTitle className="text-3xl">16</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Across 3 classes this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Predicted No-Shows</CardDescription>
            <CardTitle className="text-3xl text-orange-600">6</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">87% average confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Auto-Filled This Week</CardDescription>
            <CardTitle className="text-3xl text-green-600">23</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">94% showed up</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue Recovered</CardDescription>
            <CardTitle className="text-3xl text-green-600">$414</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">From filled no-show spots</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classes with Active Waitlists</CardTitle>
          <CardDescription>AI predictions for no-shows and automatic spot filling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waitlistClasses.map((cls) => (
              <div key={cls.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{cls.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cls.time} • {cls.instructor}
                    </p>
                  </div>
                  <Badge variant="secondary">{cls.confidence}% confidence</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="font-medium">
                      {cls.booked}/{cls.capacity}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Waitlist</p>
                    <p className="font-medium">{cls.waitlist} members</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Predicted No-Shows</p>
                    <p className="font-medium text-orange-600">{cls.noShowPrediction}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-muted-foreground">Will auto-fill:</span>
                    <span className="font-medium text-green-600">{cls.autoFillCount} spots</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waitlist for Power Vinyasa - Monday 6:00 PM</CardTitle>
          <CardDescription>Members ranked by probability of spot availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {waitlistMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <Badge variant={member.position <= 3 ? "default" : "secondary"}>#{member.position}</Badge>
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">Added {member.addedAt}</p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Spot Probability:</span>
                    <span className="font-medium">{member.autoFillProbability}%</span>
                  </div>
                  <Progress value={member.autoFillProbability} className="h-2 w-32" />
                </div>

                <Badge
                  variant={
                    member.status === "likely" ? "default" : member.status === "possible" ? "secondary" : "outline"
                  }
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            No-Show Patterns
          </CardTitle>
          <CardDescription>Historical no-show rates by day of week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {noShowPatterns.map((pattern) => (
              <div key={pattern.day} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium">{pattern.day}</div>
                <div className="flex-1">
                  <Progress value={pattern.rate * 5} className="h-3" />
                </div>
                <div className="text-right w-20">
                  <span
                    className={`text-sm font-medium ${pattern.rate > pattern.avg ? "text-orange-600" : "text-green-600"}`}
                  >
                    {pattern.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Average no-show rate: 8% • Fridays and Mondays show higher no-show patterns
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
