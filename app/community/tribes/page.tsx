import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, TrendingUp, Calendar } from "lucide-react"

export default function TribesBrowserPage() {
  const tribes = [
    {
      id: 1,
      name: "Early Birds",
      description: "Morning practice enthusiasts who love sunrise flows",
      members: 48,
      category: "Time-based",
      activity: "Very Active",
      nextEvent: "Tomorrow, 6:00 AM",
      image: "/tribes/early-birds.jpg",
    },
    {
      id: 2,
      name: "Power Flow Warriors",
      description: "Advanced practitioners pushing limits with challenging sequences",
      members: 32,
      category: "Style-based",
      activity: "Active",
      nextEvent: "Today, 7:00 PM",
      image: "/tribes/power-flow.jpg",
    },
    {
      id: 3,
      name: "Meditation Circle",
      description: "Deep dive into mindfulness and meditation practices",
      members: 56,
      category: "Practice-based",
      activity: "Very Active",
      nextEvent: "Friday, 8:00 AM",
      image: "/tribes/meditation.jpg",
    },
    {
      id: 4,
      name: "Wellness Journey",
      description: "Holistic approach combining yoga, nutrition, and lifestyle",
      members: 41,
      category: "Lifestyle",
      activity: "Active",
      nextEvent: "Saturday, 10:00 AM",
      image: "/tribes/wellness.jpg",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Practice Tribes</h1>
        <p className="text-muted-foreground">Join communities of like-minded practitioners and grow together</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Tribes</CardTitle>
            <CardDescription>Communities you're part of</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Active memberships</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Connections</CardTitle>
            <CardDescription>Practice partners across tribes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">34</div>
            <p className="text-sm text-muted-foreground">Fellow practitioners</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {tribes.map((tribe) => (
          <Card key={tribe.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={tribe.image || "/placeholder.svg"} />
                    <AvatarFallback>{tribe.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{tribe.name}</CardTitle>
                    <CardDescription>{tribe.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{tribe.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tribe.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tribe.activity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tribe.nextEvent}</span>
                </div>
              </div>
              <Button className="w-full">Join Tribe</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
