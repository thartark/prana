import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const MOCK_TEMPLATES = [
  {
    id: "tmpl-1",
    name: "booking_confirmation",
    subject: "You're booked for {{class_name}} 🧘",
    variables: ["client_name", "class_name", "class_time", "instructor_name"],
  },
  {
    id: "tmpl-2",
    name: "class_reminder",
    subject: "Reminder: {{class_name}} starts in 2 hours",
    variables: ["client_name", "class_name", "class_time", "location"],
  },
  {
    id: "tmpl-3",
    name: "waitlist_promotion",
    subject: "A spot opened up in {{class_name}}!",
    variables: ["client_name", "class_name", "class_time", "hold_expires"],
  },
  {
    id: "tmpl-4",
    name: "membership_expiring",
    subject: "Your membership expires in {{days_left}} days",
    variables: ["client_name", "membership_type", "expiry_date"],
  },
  {
    id: "tmpl-5",
    name: "payment_failed",
    subject: "We couldn't process your payment",
    variables: ["client_name", "amount", "retry_link"],
  },
]

export default async function AdminNotificationsPage() {
  const supabase = await createClient()

  let templates: any[] = MOCK_TEMPLATES
  if (supabase) {
    const { data } = await supabase.from("email_templates").select("*").order("name")
    templates = data || []
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
          <p className="text-muted-foreground">Manage automated email templates</p>
        </div>
      </div>

      <div className="grid gap-4">
        {templates && templates.length > 0 ? (
          templates.map((template: any) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg capitalize">{template.name.replace(/_/g, " ")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Subject:</span>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Variables:</span>
                    <p className="text-sm text-muted-foreground">{template.variables?.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No email templates found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
