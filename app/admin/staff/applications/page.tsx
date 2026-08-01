import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MOCK_APPLICATIONS = [
  { id: "a1", first_name: "Priya", last_name: "Nair", status: "pending", email: "priya.nair@email.com", phone: "(479) 555-0181", years_experience: 6, certifications: "RYT-500, Yin Yoga", teaching_styles: "Yin, Hatha, Restorative", cover_letter: "I've been teaching in Bentonville for six years and would love to bring a slower, breath-led practice to Trailside." },
  { id: "a2", first_name: "Marcus", last_name: "Bell", status: "pending", email: "marcus.bell@email.com", phone: "(479) 555-0164", years_experience: 3, certifications: "RYT-200", teaching_styles: "Power, Vinyasa", cover_letter: "Former collegiate athlete turned yoga teacher — I focus on strong, accessible flows." },
  { id: "a3", first_name: "Dana", last_name: "Whitfield", status: "accepted", email: "dana.w@email.com", phone: "(479) 555-0139", years_experience: 9, certifications: "E-RYT 500, Prenatal", teaching_styles: "Prenatal, Gentle", cover_letter: "" },
  { id: "a4", first_name: "Tomás", last_name: "Reyes", status: "rejected", email: "tomas.reyes@email.com", phone: "(479) 555-0122", years_experience: 1, certifications: "RYT-200 (in progress)", teaching_styles: "Vinyasa", cover_letter: "" },
]

export default async function ApplicationsPage() {
  const supabase = await createServerClient()

  let applications: any[] = MOCK_APPLICATIONS
  if (supabase) {
    applications =
      (await supabase.from("instructor_applications").select("*").order("created_at", { ascending: false })).data || []
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Instructor Applications</h1>
        <p className="text-muted-foreground">Review and manage instructor applications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications?.map((app) => (
              <div key={app.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {app.first_name} {app.last_name}
                      </p>
                      <Badge
                        variant={
                          app.status === "accepted"
                            ? "default"
                            : app.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {app.email} | {app.phone}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Experience:</span> {app.years_experience} years
                    </p>
                    {app.certifications && (
                      <p className="text-sm">
                        <span className="font-medium">Certifications:</span> {app.certifications}
                      </p>
                    )}
                    {app.teaching_styles && (
                      <p className="text-sm">
                        <span className="font-medium">Teaching Styles:</span> {app.teaching_styles}
                      </p>
                    )}
                    {app.cover_letter && <p className="text-sm text-muted-foreground mt-2">{app.cover_letter}</p>}
                  </div>
                  {app.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm">Interview</Button>
                      <Button size="sm" variant="outline">
                        Accept
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {(!applications || applications.length === 0) && (
              <p className="text-sm text-muted-foreground">No applications yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
