import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MOCK_REQUESTS = [
  { id: "r1", status: "pending", start_date: "2026-08-12", end_date: "2026-08-16", reason: "Family wedding out of state.", instructor: { full_name: "Sarah Johnson", email: "sarah@email.com" } },
  { id: "r2", status: "pending", start_date: "2026-08-20", end_date: "2026-08-21", reason: "Continuing-education workshop.", instructor: { full_name: "Michael Chen", email: "michael@email.com" } },
  { id: "r3", status: "approved", start_date: "2026-09-01", end_date: "2026-09-07", reason: "Vacation.", instructor: { full_name: "Emma Rodriguez", email: "emma@email.com" } },
  { id: "r4", status: "approved", start_date: "2026-07-04", end_date: "2026-07-04", reason: "Holiday.", instructor: { full_name: "David Kim", email: "david@email.com" } },
  { id: "r5", status: "denied", start_date: "2026-08-02", end_date: "2026-08-09", reason: "Overlaps with the summer retreat week.", instructor: { full_name: "Lisa Martinez", email: "lisa@email.com" } },
]

export default async function TimeOffPage() {
  const supabase = await createServerClient()

  let requests: any[] = MOCK_REQUESTS
  if (supabase) {
    requests =
      (await supabase
        .from("time_off_requests")
        .select("*, instructor:profiles(full_name, email)")
        .order("created_at", { ascending: false })).data || []
  }

  const pending = requests?.filter((r) => r.status === "pending") || []
  const approved = requests?.filter((r) => r.status === "approved") || []
  const denied = requests?.filter((r) => r.status === "denied") || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Time Off Requests</h1>
          <p className="text-muted-foreground">Manage staff time off and vacation requests</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approved.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{denied.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests?.map((request) => (
              <div key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{request.instructor?.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(request.start_date).toLocaleDateString()} -{" "}
                    {new Date(request.end_date).toLocaleDateString()}
                  </p>
                  {request.reason && <p className="text-xs text-muted-foreground">{request.reason}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "denied"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Deny
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {(!requests || requests.length === 0) && (
              <p className="text-sm text-muted-foreground">No time off requests</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
