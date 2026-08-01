import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

const MOCK_COMMISSIONS = [
  { id: "c1", amount: 210, status: "pending", source_type: "class", class_date: "2026-07-30", students_count: 14, instructor: { full_name: "Sarah Johnson" } },
  { id: "c2", amount: 135, status: "pending", source_type: "class", class_date: "2026-07-29", students_count: 9, instructor: { full_name: "Michael Chen" } },
  { id: "c3", amount: 320, status: "pending", source_type: "workshop", class_date: "2026-07-26", students_count: 16, instructor: { full_name: "Emma Rodriguez" } },
  { id: "c4", amount: 90, status: "pending", source_type: "private", class_date: "2026-07-27", students_count: 1, instructor: { full_name: "Lisa Martinez" } },
]
const MOCK_PAYOUTS = [
  { id: "po1", total_amount: 1240, status: "completed", period_start: "2026-07-01", period_end: "2026-07-15", payment_method: "direct deposit", instructor: { full_name: "Sarah Johnson" } },
  { id: "po2", total_amount: 980, status: "completed", period_start: "2026-07-01", period_end: "2026-07-15", payment_method: "direct deposit", instructor: { full_name: "Michael Chen" } },
  { id: "po3", total_amount: 615, status: "processing", period_start: "2026-07-16", period_end: "2026-07-31", payment_method: "check", instructor: { full_name: "David Kim" } },
]

export default async function PayoutsPage() {
  const supabase = await createServerClient()

  let commissions: any[] = MOCK_COMMISSIONS
  let payouts: any[] = MOCK_PAYOUTS
  if (supabase) {
    commissions =
      (await supabase
        .from("instructor_commissions")
        .select("*, instructor:profiles(full_name)")
        .eq("status", "pending")
        .order("created_at", { ascending: false })).data || []
    payouts =
      (await supabase
        .from("instructor_payouts")
        .select("*, instructor:profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(20)).data || []
  }

  const pendingTotal = commissions?.reduce((sum, c) => sum + Number(c.amount), 0) || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Instructor Payouts</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Payout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{commissions?.length || 0} items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">0 payouts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Paid (All Time)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${payouts?.reduce((sum, p) => sum + Number(p.total_amount), 0).toFixed(2) || "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">{payouts?.length || 0} payouts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commissions?.map((commission) => (
              <div key={commission.id} className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="font-medium">{commission.instructor?.full_name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="capitalize">{commission.source_type}</span>
                    {commission.class_date && (
                      <>
                        <span>•</span>
                        <span>{new Date(commission.class_date).toLocaleDateString()}</span>
                      </>
                    )}
                    {commission.students_count && (
                      <>
                        <span>•</span>
                        <span>{commission.students_count} students</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{commission.status}</Badge>
                  <span className="text-lg font-semibold">${Number(commission.amount).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payouts?.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="font-medium">{payout.instructor?.full_name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {new Date(payout.period_start).toLocaleDateString()} -{" "}
                      {new Date(payout.period_end).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{payout.payment_method}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      payout.status === "completed"
                        ? "default"
                        : payout.status === "failed"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {payout.status}
                  </Badge>
                  <span className="text-lg font-semibold">${Number(payout.total_amount).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
