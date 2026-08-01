import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MOCK_POLICIES = [
  { id: "cp1", name: "Standard Classes", is_active: true, hours_before_class: 12, penalty_type: "class_forfeit", penalty_amount: null, applies_to: ["drop-in", "class packs"] },
  { id: "cp2", name: "Workshops & Events", is_active: true, hours_before_class: 48, penalty_type: "fixed_fee", penalty_amount: 20, applies_to: ["workshops", "events"] },
  { id: "cp3", name: "Private Sessions", is_active: true, hours_before_class: 24, penalty_type: "full_charge", penalty_amount: null, applies_to: ["private sessions"] },
  { id: "cp4", name: "Retreats", is_active: false, hours_before_class: 336, penalty_type: "deposit_forfeit", penalty_amount: 150, applies_to: ["retreats"] },
]

export default async function CancellationPolicyPage() {
  const supabase = await createServerClient()

  let policies: any[] = MOCK_POLICIES
  if (supabase) {
    policies = (
      await supabase.from("cancellation_policies").select("*").order("created_at", { ascending: false })
    ).data || []
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cancellation Policies</h1>
        <p className="text-muted-foreground">Manage late cancellation rules and penalties</p>
      </div>

      <div className="grid gap-4">
        {policies?.map((policy) => (
          <Card key={policy.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{policy.name}</CardTitle>
                <Badge variant={policy.is_active ? "default" : "secondary"}>
                  {policy.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>Cancel at least {policy.hours_before_class} hours before class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Penalty Type:</span>
                  <span className="font-medium capitalize">{policy.penalty_type.replace("_", " ")}</span>
                </div>
                {policy.penalty_amount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Penalty Amount:</span>
                    <span className="font-medium">${policy.penalty_amount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applies To:</span>
                  <span className="font-medium">{policy.applies_to?.join(", ")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
