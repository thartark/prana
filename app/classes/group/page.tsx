"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, MapPin, Clock, Plus } from "lucide-react"

export default function GroupClassesPage() {
  const [groupClasses] = useState([
    {
      id: 1,
      title: "Corporate Wellness - TechCorp",
      type: "Private Group",
      participants: 15,
      maxCapacity: 20,
      instructor: "Sarah Chen",
      schedule: "Every Monday & Wednesday, 12:00 PM",
      location: "TechCorp Office, Room 301",
      duration: "45 min",
      status: "Active",
    },
    {
      id: 2,
      title: "Birthday Yoga Party",
      type: "Special Event",
      participants: 12,
      maxCapacity: 15,
      instructor: "Lisa Anderson",
      schedule: "Saturday, Jan 20, 2:00 PM",
      location: "Main Studio",
      duration: "90 min",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Team Building Session",
      type: "Corporate Event",
      participants: 8,
      maxCapacity: 12,
      instructor: "Michael Torres",
      schedule: "Friday, Jan 25, 4:00 PM",
      location: "Private Room B",
      duration: "60 min",
      status: "Confirmed",
    },
  ])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Group Classes</h1>
          <p className="text-muted-foreground">Private group sessions, corporate wellness, and special events</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Request Group Class
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">Across all groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {groupClasses.map((groupClass) => (
          <Card key={groupClass.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{groupClass.title}</CardTitle>
                    <Badge variant={groupClass.status === "Active" ? "default" : "secondary"}>
                      {groupClass.status}
                    </Badge>
                  </div>
                  <Badge variant="outline">{groupClass.type}</Badge>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {groupClass.participants} / {groupClass.maxCapacity}
                    </p>
                    <p className="text-muted-foreground text-xs">Participants</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{groupClass.schedule.split(",")[0]}</p>
                    <p className="text-muted-foreground text-xs">Schedule</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{groupClass.duration}</p>
                    <p className="text-muted-foreground text-xs">Duration</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{groupClass.location.split(",")[0]}</p>
                    <p className="text-muted-foreground text-xs">Location</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm">
                  <span className="font-medium">Instructor:</span> {groupClass.instructor}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Group Class Benefits</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Customized Sessions</h4>
              <p className="text-sm text-muted-foreground">Tailored to your group's needs and skill levels</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Flexible Locations</h4>
              <p className="text-sm text-muted-foreground">At our studio, your office, or any private venue</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Flexible Scheduling</h4>
              <p className="text-sm text-muted-foreground">Choose dates and times that work for your group</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Group Discounts</h4>
              <p className="text-sm text-muted-foreground">Special rates for groups of 10 or more</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
