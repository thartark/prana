import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const MOCK_TYPES = [
  { id: "t1", name: "Drop-In", description: "Single class, no commitment.", type: "class_pack", price_cents: 2200, class_count: 1, validity_days: 30, is_active: true },
  { id: "t2", name: "10-Class Pack", description: "Ten classes to use at your pace.", type: "class_pack", price_cents: 8900, class_count: 10, validity_days: 120, is_active: true },
  { id: "t3", name: "Unlimited Monthly", description: "Unlimited classes, billed monthly.", type: "recurring", price_cents: 14900, class_count: null, validity_days: 30, is_active: true },
  { id: "t4", name: "Annual Unlimited", description: "Unlimited classes for a full year — best value.", type: "recurring", price_cents: 149000, class_count: null, validity_days: 365, is_active: true },
  { id: "t5", name: "Student Monthly", description: "Discounted unlimited for students with valid ID.", type: "recurring", price_cents: 9900, class_count: null, validity_days: 30, is_active: true },
  { id: "t6", name: "New Member Intro", description: "Two weeks unlimited for first-timers.", type: "intro", price_cents: 3900, class_count: null, validity_days: 14, is_active: false },
]

export default async function MembershipTypesPage() {
  const supabase = await createClient()

  let membershipTypes: any[] = MOCK_TYPES
  if (supabase) {
    membershipTypes = (await supabase.from("membership_types").select("*").order("price_cents")).data || []
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Membership Plans</h1>
          <p className="text-muted-foreground">Manage your membership offerings</p>
        </div>
        <Button asChild>
          <Link href="/admin/memberships/types/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {membershipTypes && membershipTypes.length > 0 ? (
          membershipTypes.map((membership: any) => (
            <Card key={membership.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{membership.name}</CardTitle>
                  <Badge variant={membership.is_active ? "default" : "secondary"}>
                    {membership.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{membership.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize">{membership.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">${(membership.price_cents / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Classes:</span>
                    <span className="font-medium">
                      {membership.class_count !== null ? membership.class_count : "Unlimited"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Validity:</span>
                    <span className="font-medium">{membership.validity_days} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No membership plans found</p>
              <Button asChild>
                <Link href="/admin/memberships/types/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Plan
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
