import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK_TEMPLATES = [
  { id: "et1", name: "Booking Confirmation", template_type: "booking_confirmation", is_active: true, subject: "You're booked for {{class_name}} 🧘", variables: ["client_name", "class_name", "class_time", "instructor_name"] },
  { id: "et2", name: "Class Reminder", template_type: "class_reminder", is_active: true, subject: "Reminder: {{class_name}} starts in 2 hours", variables: ["client_name", "class_name", "class_time", "location"] },
  { id: "et3", name: "Waitlist Promotion", template_type: "waitlist_promotion", is_active: true, subject: "A spot opened up in {{class_name}}!", variables: ["client_name", "class_name", "class_time", "hold_expires"] },
  { id: "et4", name: "Membership Expiring", template_type: "membership_expiring", is_active: true, subject: "Your membership expires in {{days_left}} days", variables: ["client_name", "membership_type", "expiry_date"] },
  { id: "et5", name: "Payment Failed", template_type: "payment_failed", is_active: false, subject: "We couldn't process your payment", variables: ["client_name", "amount", "retry_link"] },
]

export default async function EmailTemplatesPage() {
  const supabase = await createServerClient()

  let templates: any[] = MOCK_TEMPLATES
  if (supabase) {
    templates = (await supabase.from("email_templates").select("*").order("template_type")).data || []
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">Customize automated email communications</p>
        </div>
        <Button asChild>
          <Link href="/admin/email-templates/new">Create Template</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {templates?.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription className="mt-1">Type: {template.template_type.replace("_", " ")}</CardDescription>
                </div>
                <Badge variant={template.is_active ? "default" : "secondary"}>
                  {template.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Subject:</p>
                  <p className="text-sm text-muted-foreground">{template.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Available Variables:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.variables?.map((variable: string) => (
                      <Badge key={variable} variant="outline" className="text-xs font-mono">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/email-templates/${template.id}/edit`}>Edit Template</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
