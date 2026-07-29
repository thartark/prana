import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { GenerateInstancesButton } from "@/components/generate-instances-button"
import { mockDataManager } from "@/lib/mock-data"

export default async function ClassInstancesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  let classData: any = null
  let instances: any[] = []

  if (!supabase) {
    // Use mock data
    const classes = mockDataManager.getClasses()
    classData = classes.find((c) => c.id === id) || classes[0]
    
    // Generate mock instances
    const today = new Date()
    instances = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() + i + 1)
      return {
        id: `instance-${i}`,
        scheduled_date: date.toISOString().split("T")[0],
        start_time: classData.time || "09:00",
        end_time: "10:00",
        room: classData.room || "Studio A",
        capacity: classData.capacity || 20,
        status: "scheduled",
        instructors: { profiles: { full_name: classData.instructor_name } },
        bookings: Array.from({ length: Math.floor(Math.random() * 15) }, (_, j) => ({ id: `booking-${j}` })),
        waitlist: Math.random() > 0.7 ? [{ id: "w1" }, { id: "w2" }] : [],
      }
    })
  } else {
    const { data: dbClassData } = await supabase.from("classes").select("*").eq("id", id).single()
    classData = dbClassData

    if (!classData) {
      notFound()
    }

    const { data: dbInstances } = await supabase
      .from("class_instances")
      .select(
        `
        id,
        scheduled_date,
        start_time,
        end_time,
        room,
        capacity,
        status,
        instructors!class_instances_instructor_id_fkey(
          profiles!instructors_user_id_fkey(full_name)
        ),
        bookings(id),
        waitlist(id)
      `,
      )
      .eq("class_id", id)
      .gte("scheduled_date", new Date().toISOString().split("T")[0])
      .order("scheduled_date")
      .order("start_time")
      .limit(20)
    instances = dbInstances || []
  }

  if (!classData) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{classData.name} - Instances</h1>
        <p className="text-muted-foreground">View and manage upcoming class instances</p>
      </div>

      <div className="flex gap-4">
        <GenerateInstancesButton classId={id} />
        <Button variant="outline" asChild>
          <Link href="/admin/classes">Back to Classes</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {instances && instances.length > 0 ? (
          instances.map((instance: any) => {
            const bookedCount = instance.bookings?.length || 0
            const waitlistCount = instance.waitlist?.length || 0
            const spotsLeft = instance.capacity - bookedCount

            return (
              <Card key={instance.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {new Date(instance.scheduled_date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          instance.status === "scheduled"
                            ? "default"
                            : instance.status === "cancelled"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {instance.status}
                      </Badge>
                      {waitlistCount > 0 && <Badge variant="outline">{waitlistCount} on waitlist</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Time:</span> {instance.start_time} - {instance.end_time}
                    </div>
                    <div>
                      <span className="font-medium">Instructor:</span>{" "}
                      {instance.instructors?.profiles?.full_name || "Not assigned"}
                    </div>
                    <div>
                      <span className="font-medium">Capacity:</span> {bookedCount}/{instance.capacity} (
                      {spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"})
                    </div>
                    {instance.room && (
                      <div>
                        <span className="font-medium">Room:</span> {instance.room}
                      </div>
                    )}
                  </div>
                  {waitlistCount > 0 && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/classes/${id}/instances/${instance.id}/waitlist`}>
                          Manage Waitlist ({waitlistCount})
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No upcoming instances found</p>
              <GenerateInstancesButton classId={id} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
