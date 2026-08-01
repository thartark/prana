import { createServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const MOCK_CODES = [
  { id: "dc1", code: "NEWMEMBER", description: "20% off a new member's first month", is_active: true, discount_type: "percentage", discount_value: 20, uses_count: 47, max_uses: null, valid_until: null },
  { id: "dc2", code: "SUMMER25", description: "$25 off any class pack", is_active: true, discount_type: "fixed", discount_value: 25, uses_count: 63, max_uses: 200, valid_until: "2026-08-31" },
  { id: "dc3", code: "FRIENDREFER", description: "15% off when referred by a member", is_active: true, discount_type: "percentage", discount_value: 15, uses_count: 21, max_uses: null, valid_until: null },
  { id: "dc4", code: "GRANDOPEN", description: "Grand opening — 50% off first drop-in", is_active: false, discount_type: "percentage", discount_value: 50, uses_count: 180, max_uses: 180, valid_until: "2026-02-01" },
]

export default async function DiscountCodesPage() {
  const supabase = await createServerClient()

  let codes: any[] = MOCK_CODES
  if (supabase) {
    codes = (await supabase.from("discount_codes").select("*").order("created_at", { ascending: false })).data || []
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Discount Codes</h1>
          <p className="text-muted-foreground">Manage promotional codes and discounts</p>
        </div>
        <Button asChild>
          <Link href="/admin/discount-codes/new">Create Code</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {codes?.map((code) => (
          <Card key={code.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-mono">{code.code}</CardTitle>
                  <CardDescription>{code.description}</CardDescription>
                </div>
                <Badge variant={code.is_active ? "default" : "secondary"}>
                  {code.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-medium">
                    {code.discount_type === "percentage" ? `${code.discount_value}%` : `$${code.discount_value}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uses:</span>
                  <span className="font-medium">
                    {code.uses_count} / {code.max_uses || "∞"}
                  </span>
                </div>
                {code.valid_until && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires:</span>
                    <span className="font-medium">{new Date(code.valid_until).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
