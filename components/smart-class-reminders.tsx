"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, MapPin, User, Calendar } from "lucide-react"
import Link from "next/link"

interface UpcomingClass {
  id: string
  name: string
  instructor: string
  location: string
  startTime: Date
  duration: number
  spotsLeft: number
}

export function SmartClassReminders() {
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([
    {
      id: "1",
      name: "Morning Vinyasa Flow",
      instructor: "Sarah Martinez",
      location: "Main Studio",
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      duration: 60,
      spotsLeft: 3,
    },
    {
      id: "2",
      name: "Power Yoga",
      instructor: "Michael Chen",
      location: "Studio B",
      startTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      duration: 75,
      spotsLeft: 8,
    },
  ])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const getTimeUntilClass = (startTime: Date) => {
    const diff = startTime.getTime() - currentTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours === 0) {
      return `${minutes}m`
    }
    return hours < 24 ? `${hours}h ${minutes}m` : `${Math.floor(hours / 24)}d`
  }

  const isComingSoon = (startTime: Date) => {
    const diff = startTime.getTime() - currentTime.getTime()
    const hours = diff / (1000 * 60 * 60)
    return hours <= 2
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Upcoming Classes
            </CardTitle>
            <CardDescription>Your booked classes with smart reminders</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/classes">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((classItem) => (
              <div
                key={classItem.id}
                className={`p-4 rounded-lg border-2 ${
                  isComingSoon(classItem.startTime) ? "border-orange-500 bg-orange-50" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{classItem.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <User className="h-3 w-3" />
                      <span>{classItem.instructor}</span>
                    </div>
                  </div>
                  {isComingSoon(classItem.startTime) && (
                    <Badge variant="destructive" className="animate-pulse">
                      <Bell className="h-3 w-3 mr-1" />
                      Soon!
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {classItem.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="text-xs text-muted-foreground">{classItem.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{classItem.location}</p>
                      <p className="text-xs text-muted-foreground">{classItem.spotsLeft} spots left</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-md ${
                    isComingSoon(classItem.startTime) ? "bg-orange-100" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Starts in {getTimeUntilClass(classItem.startTime)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/classes/${classItem.id}`}>Details</Link>
                    </Button>
                    <Button size="sm">Check In</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No upcoming classes booked</p>
              <Button asChild>
                <Link href="/classes">Browse Classes</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
