"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, TrendingUp, Settings } from "lucide-react"
import { StudioSwitcher } from "@/components/studio-switcher"

export default function MultiLocationDashboard() {
  const locations = [
    {
      id: "1",
      name: "Downtown Studio",
      address: "123 Main St",
      status: "active",
      members: 342,
      classesToday: 8,
      revenue: "$12,450",
      utilization: 78,
    },
    {
      id: "2",
      name: "Uptown Wellness Center",
      address: "456 Park Ave",
      status: "active",
      members: 289,
      classesToday: 12,
      revenue: "$15,230",
      utilization: 85,
    },
    {
      id: "3",
      name: "Westside Yoga Loft",
      address: "789 West Blvd",
      status: "active",
      members: 156,
      classesToday: 5,
      revenue: "$8,920",
      utilization: 62,
    },
    {
      id: "4",
      name: "East End Studio",
      address: "321 East St",
      status: "opening-soon",
      members: 45,
      classesToday: 0,
      revenue: "$0",
      utilization: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Multi-Location Dashboard</h1>
          <p className="text-muted-foreground">Manage all studio locations from one place</p>
        </div>
        <StudioSwitcher />
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">3 active, 1 opening soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">832</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$36,600</div>
            <p className="text-xs text-muted-foreground">Today across all studios</p>
          </CardContent>
        </Card>
      </div>

      {/* Location Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {location.name}
                    <Badge variant={location.status === "active" ? "default" : "secondary"}>
                      {location.status === "active" ? "Active" : "Opening Soon"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{location.address}</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-2xl font-bold">{location.members}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Classes Today</p>
                  <p className="text-2xl font-bold">{location.classesToday}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">{location.revenue}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="font-medium">{location.utilization}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${location.utilization}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
