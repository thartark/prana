"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RealTimeCapacityIndicator } from "./real-time-capacity-indicator"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface LiveClass {
  id: string
  name: string
  time: string
  instructor: string
  location: string
  current: number
  capacity: number
  waitlist: number
}

export function LiveDashboardWidget() {
  const [classes, setClasses] = useState<LiveClass[]>([
    {
      id: "1",
      name: "Morning Flow",
      time: "6:00 AM",
      instructor: "Sarah Chen",
      location: "Studio A",
      current: 18,
      capacity: 20,
      waitlist: 3,
    },
    {
      id: "2",
      name: "Power Vinyasa",
      time: "9:00 AM",
      instructor: "Michael Torres",
      location: "Studio B",
      current: 12,
      capacity: 25,
      waitlist: 0,
    },
    {
      id: "3",
      name: "Gentle Yoga",
      time: "10:30 AM",
      instructor: "Emma Wilson",
      location: "Studio A",
      current: 8,
      capacity: 15,
      waitlist: 0,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setClasses((prev) =>
        prev.map((cls) => ({
          ...cls,
          current: Math.max(0, Math.min(cls.capacity, cls.current + (Math.random() > 0.6 ? 1 : 0))),
        })),
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          Live Class Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {classes.map((cls) => (
          <div key={cls.id} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{cls.name}</h4>
                <p className="text-sm text-muted-foreground">{cls.instructor}</p>
              </div>
              <Badge variant="outline">{cls.time}</Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{cls.location}</span>
            </div>

            <RealTimeCapacityIndicator current={cls.current} capacity={cls.capacity} waitlist={cls.waitlist} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
