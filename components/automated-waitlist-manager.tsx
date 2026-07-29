"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function AutomatedWaitlistManager() {
  const [autoFill, setAutoFill] = useState(true)
  const [smartNotify, setSmartNotify] = useState(true)

  const waitlistStats = {
    totalWaitlisted: 24,
    autoFilledToday: 8,
    conversionRate: 78,
    avgWaitTime: "2.3 hours",
  }

  const recentAutoFills = [
    { class: "Morning Flow", time: "6:00 AM", member: "Sarah J.", filledAt: "5 min ago" },
    { class: "Power Yoga", time: "9:00 AM", member: "Mike T.", filledAt: "12 min ago" },
    { class: "Gentle Stretch", time: "10:30 AM", member: "Emma W.", filledAt: "25 min ago" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Waitlist Management</CardTitle>
          <CardDescription>Intelligent waitlist system with auto-fill and smart notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">On Waitlist</p>
              <p className="text-2xl font-bold">{waitlistStats.totalWaitlisted}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Auto-filled Today</p>
              <p className="text-2xl font-bold text-green-600">{waitlistStats.autoFilledToday}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold">{waitlistStats.conversionRate}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Wait Time</p>
              <p className="text-2xl font-bold">{waitlistStats.avgWaitTime}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-fill">Auto-fill from Waitlist</Label>
                <p className="text-sm text-muted-foreground">Automatically move waitlisted members when spots open</p>
              </div>
              <Switch id="auto-fill" checked={autoFill} onCheckedChange={setAutoFill} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smart-notify">Smart Notifications</Label>
                <p className="text-sm text-muted-foreground">Send priority alerts based on likelihood to attend</p>
              </div>
              <Switch id="smart-notify" checked={smartNotify} onCheckedChange={setSmartNotify} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Recent Auto-fills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAutoFills.map((fill, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{fill.class}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{fill.time}</span>
                    <span>•</span>
                    <span>{fill.member}</span>
                  </div>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {fill.filledAt}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
