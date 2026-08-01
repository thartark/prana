import { createClient } from "@/lib/supabase/server"
import { getMockData } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PromoteFromWaitlistButton } from "@/components/promote-from-waitlist-button"

const MOCK_WAITLIST = [
  { id: "wl1", position: 1, joined_at: "2026-07-28", status: "waiting", profiles: { id: "u1", full_name: "Jennifer Adams", email: "jennifer@email.com" } },
  { id: "wl2", position: 2, joined_at: "2026-07-29", status: "waiting", profiles: { id: "u2", full_name: "Marcus Lee", email: "marcus@email.com" } },
  { id: "wl3", position: 3, joined_at: "2026-07-30", status: "waiting", profiles: { id: "u3", full_name: "Priya Patel", email: "priya@email.com" } },
]

export default async function WaitlistManagementPage({
  params,
}: {
  params: Promise<{ id: string; instanceId: string }>
}) {
  const { id, instanceId } = await params
  const supabase = await createClient()

  let instance: any = null
  let waitlistEntries: any[] = MOCK_WAITLIST
  if (supabase) {
    instance = (
      await supabase
        .from("class_instances")
        .select(
          `
          id,
          scheduled_date,
          start_time,
          end_time,
          capacity,
          classes!class_instances_class_id_fkey(name),
          bookings(id)
        `,
        )
        .eq("id", instanceId)
        .single()
    ).data

    if (!instance) {
      notFound()
    }

    waitlistEntries =
      (await supabase
        .from("waitlist")
        .select(
          `
          id,
          position,
          joined_at,
          status,
          profiles!waitlist_user_id_fkey(full_name, email)
        `,
        )
        .eq("class_instance_id", instanceId)
        .eq("status", "waiting")
        .order("position")).data || []
  } else {
    const mock = getMockData()
    const inst = mock.classInstances?.find((ci: any) => ci.id === instanceId)
    const capacity = inst?.capacity ?? 20
    const booked = capacity - 1 // one spot open, so the Promote-from-waitlist action is visible
    instance = {
      id: instanceId,
      scheduled_date: inst?.date || "2026-08-05",
      start_time: inst?.start_time || "6:00 PM",
      end_time: inst?.end_time || "7:00 PM",
      capacity,
      classes: { name: inst?.class_name || mock.classes?.find((c: any) => c.id === id)?.name || "Class" },
      bookings: Array.from({ length: booked }, (_, i) => ({ id: `b${i}` })),
    }
  }

  const bookedCount = instance.bookings?.length || 0
  const spotsLeft = instance.capacity - bookedCount

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Waitlist Management</h1>
        <p className="text-muted-foreground">
          {instance.classes?.name} -{" "}
          {new Date(instance.scheduled_date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          at {instance.start_time}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Badge variant={spotsLeft > 0 ? "default" : "destructive"}>
          {bookedCount}/{instance.capacity} booked ({spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"})
        </Badge>
        <Button variant="outline" asChild>
          <Link href={`/admin/classes/${id}/instances`}>Back to Instances</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Waitlist ({waitlistEntries?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {waitlistEntries && waitlistEntries.length > 0 ? (
            <div className="space-y-3">
              {waitlistEntries.map((entry: any) => (
                <div key={entry.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-lg font-semibold">
                      #{entry.position}
                    </Badge>
                    <div>
                      <p className="font-medium">{entry.profiles?.full_name}</p>
                      <p className="text-sm text-muted-foreground">{entry.profiles?.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {new Date(entry.joined_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {spotsLeft > 0 && (
                    <PromoteFromWaitlistButton
                      waitlistId={entry.id}
                      instanceId={instanceId}
                      userId={entry.profiles?.id}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No one on the waitlist</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
