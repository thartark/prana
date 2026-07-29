"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  MapPin, 
  Calendar,
  Settings,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock room data
const rooms = [
  {
    id: "room-1",
    name: "Main Studio",
    capacity: 25,
    current_setup: "yoga",
    amenities: ["Mirrors", "Sound System", "Climate Control", "Natural Light"],
    utilization: 78
  },
  {
    id: "room-2",
    name: "Meditation Room",
    capacity: 12,
    current_setup: "meditation",
    amenities: ["Dimmable Lights", "Sound System", "Cushions"],
    utilization: 62
  },
  {
    id: "room-3",
    name: "Private Session Room",
    capacity: 4,
    current_setup: "private",
    amenities: ["Props", "Adjustable Lighting"],
    utilization: 85
  }
]

// Mock upcoming classes with capacity info
const upcomingClasses = [
  {
    id: "c-1",
    name: "Morning Vinyasa",
    time: "7:00 AM",
    date: "Tomorrow",
    room: "Main Studio",
    capacity: 25,
    booked: 23,
    waitlist: 4,
    instructor: "Sarah Johnson"
  },
  {
    id: "c-2",
    name: "Gentle Yoga",
    time: "9:00 AM",
    date: "Tomorrow",
    room: "Main Studio",
    capacity: 25,
    booked: 18,
    waitlist: 0,
    instructor: "Michael Chen"
  },
  {
    id: "c-3",
    name: "Evening Meditation",
    time: "6:00 PM",
    date: "Tomorrow",
    room: "Meditation Room",
    capacity: 12,
    booked: 12,
    waitlist: 2,
    instructor: "Emma Rodriguez"
  },
  {
    id: "c-4",
    name: "Power Yoga",
    time: "5:30 PM",
    date: "Tomorrow",
    room: "Main Studio",
    capacity: 25,
    booked: 25,
    waitlist: 6,
    instructor: "Sarah Johnson"
  }
]

export default function CapacityManagementPage() {
  const { toast } = useToast()
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const handleCapacityUpdate = (roomId: string, newCapacity: number) => {
    toast({
      title: "Capacity updated",
      description: `Room capacity has been set to ${newCapacity}.`
    })
  }

  const getCapacityStatus = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100
    if (percentage >= 100) return { label: "Full", variant: "destructive" as const }
    if (percentage >= 80) return { label: "Almost Full", variant: "secondary" as const }
    return { label: "Available", variant: "default" as const }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Capacity & Room Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage room capacities, assignments, and monitor class fill rates
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Rooms</CardDescription>
            <CardTitle className="text-2xl">{rooms.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Capacity</CardDescription>
            <CardTitle className="text-2xl">{rooms.reduce((sum, r) => sum + r.capacity, 0)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Utilization</CardDescription>
            <CardTitle className="text-2xl">
              {Math.round(rooms.reduce((sum, r) => sum + r.utilization, 0) / rooms.length)}%
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Classes at Capacity</CardDescription>
            <CardTitle className="text-2xl text-amber-600">
              {upcomingClasses.filter(c => c.booked >= c.capacity).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rooms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Studio Rooms
            </CardTitle>
            <CardDescription>Configure capacity and settings for each room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {rooms.map((room) => (
              <div key={room.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{room.name}</h3>
                  <Badge>{room.utilization}% utilized</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Max Capacity</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        type="number" 
                        defaultValue={room.capacity}
                        className="w-20"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCapacityUpdate(room.id, room.capacity)}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Room Setup</Label>
                    <Select defaultValue={room.current_setup}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yoga">Yoga Class</SelectItem>
                        <SelectItem value="meditation">Meditation</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="private">Private Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Classes Capacity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Class Capacity
            </CardTitle>
            <CardDescription>Real-time booking status for upcoming classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingClasses.map((cls) => {
              const status = getCapacityStatus(cls.booked, cls.capacity)
              const fillPercentage = Math.min((cls.booked / cls.capacity) * 100, 100)
              
              return (
                <div key={cls.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{cls.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {cls.date} at {cls.time} - {cls.room}
                      </p>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{cls.booked} / {cls.capacity} booked</span>
                      {cls.waitlist > 0 && (
                        <span className="text-amber-600">
                          <AlertTriangle className="h-3 w-3 inline mr-1" />
                          {cls.waitlist} on waitlist
                        </span>
                      )}
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          fillPercentage >= 100 ? 'bg-destructive' : 
                          fillPercentage >= 80 ? 'bg-amber-500' : 'bg-primary'
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
