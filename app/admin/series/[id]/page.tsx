import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar, Users, DollarSign, Clock } from "lucide-react"
import { mockDataManager } from "@/lib/mock-data"

export default async function SeriesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Mock series data
  const series = {
    id,
    name: "Beginner Yoga Foundations",
    description: "A comprehensive 6-week series designed for those new to yoga. Learn proper alignment, breathing techniques, and basic poses in a supportive environment.",
    instructor_name: "Sarah Johnson",
    instructor_id: "instructor-1",
    start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 49 * 24 * 60 * 60 * 1000).toISOString(),
    sessions: 6,
    price: 150,
    drop_in_price: 30,
    capacity: 15,
    enrolled: 8,
    location: "Studio B",
    day_of_week: "Wednesday",
    time: "6:00 PM - 7:15 PM",
    status: "upcoming",
  }

  const sessions = Array.from({ length: 6 }, (_, i) => ({
    id: `session-${i + 1}`,
    week: i + 1,
    topic: [
      "Introduction to Yoga & Breath Awareness",
      "Standing Poses & Balance",
      "Forward Folds & Hip Openers",
      "Backbends & Heart Openers",
      "Twists & Core Strength",
      "Integration & Building Your Home Practice",
    ][i],
    date: new Date(Date.now() + (7 + i * 7) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/series">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{series.name}</h1>
            <Badge variant={series.status === "upcoming" ? "default" : series.status === "active" ? "secondary" : "outline"}>
              {series.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Series Details & Management</p>
        </div>
        <Button asChild>
          <Link href={`/admin/series/${id}/edit`}>Edit Series</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Series</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{series.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{series.day_of_week}s, {series.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{series.sessions} weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{series.enrolled}/{series.capacity} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">${series.price} full series / ${series.drop_in_price} drop-in</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Schedule</CardTitle>
              <CardDescription>Weekly curriculum overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Week {session.week}: {session.topic}</p>
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/admin/staff/${series.instructor_id}`} className="text-primary hover:underline font-medium">
                {series.instructor_name}
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrollment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Enrolled</span>
                <span className="font-medium">{series.enrolled}/{series.capacity}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(series.enrolled / series.capacity) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {series.capacity - series.enrolled} spots remaining
              </p>
              <Button className="w-full">View Enrollees</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <span className="font-medium">${series.enrolled * series.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Potential</span>
                <span className="font-medium">${series.capacity * series.price}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
