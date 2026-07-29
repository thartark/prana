"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, TrendingUp, Users, AlertCircle } from "lucide-react"

interface WaitlistEntry {
  id: string
  className: string
  classType: string
  date: string
  time: string
  position: number
  totalWaitlist: number
  estimatedWaitTime: number
  likelihood: number
}

export function WaitlistPositionTracker() {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([
    {
      id: "1",
      className: "Hot Power Yoga",
      classType: "Power Yoga",
      date: "Tomorrow",
      time: "6:00 PM",
      position: 3,
      totalWaitlist: 8,
      estimatedWaitTime: 15,
      likelihood: 85,
    },
    {
      id: "2",
      className: "Morning Flow",
      classType: "Vinyasa",
      date: "Friday",
      time: "7:00 AM",
      position: 7,
      totalWaitlist: 12,
      likelihood: 45,
      estimatedWaitTime: 45,
    },
  ])

  const getLikelihoodColor = (likelihood: number) => {
    if (likelihood >= 70) return "text-green-600"
    if (likelihood >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getLikelihoodBadge = (likelihood: number) => {
    if (likelihood >= 70) return { variant: "default" as const, label: "High Chance" }
    if (likelihood >= 40) return { variant: "secondary" as const, label: "Moderate" }
    return { variant: "outline" as const, label: "Low Chance" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Waitlist Position Tracker
        </CardTitle>
        <CardDescription>Real-time updates on your spot availability chances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {waitlistEntries.length > 0 ? (
            waitlistEntries.map((entry) => {
              const badge = getLikelihoodBadge(entry.likelihood)
              return (
                <div key={entry.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{entry.className}</h4>
                      <p className="text-sm text-muted-foreground">{entry.classType}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {entry.date} at {entry.time}
                      </p>
                    </div>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Your Position</span>
                      </div>
                      <p className="text-2xl font-bold">
                        #{entry.position}
                        <span className="text-sm font-normal text-muted-foreground"> / {entry.totalWaitlist}</span>
                      </p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Est. Wait</span>
                      </div>
                      <p className="text-2xl font-bold">{entry.estimatedWaitTime}m</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Spot Opening Likelihood
                      </span>
                      <span className={`text-sm font-bold ${getLikelihoodColor(entry.likelihood)}`}>
                        {entry.likelihood}%
                      </span>
                    </div>
                    <Progress value={entry.likelihood} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Based on historical no-show patterns and booking trends
                    </p>
                  </div>

                  {entry.position <= 3 && (
                    <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-green-900">
                        <p className="font-semibold">You're near the top!</p>
                        <p>We'll notify you immediately if a spot opens up.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Set Alert
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Leave Waitlist
                    </Button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No waitlist entries</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
