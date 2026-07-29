"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Clock,
  Users,
  Building
} from "lucide-react"

const complianceItems = [
  {
    id: "waivers",
    name: "Liability Waivers",
    description: "All active members must have signed waivers on file",
    status: "compliant",
    progress: 98,
    lastUpdated: "2025-01-15",
    action: "View Unsigned",
  },
  {
    id: "certifications",
    name: "Instructor Certifications",
    description: "All instructors must have valid RYT certifications",
    status: "attention",
    progress: 85,
    lastUpdated: "2025-01-10",
    action: "Review Expiring",
  },
  {
    id: "insurance",
    name: "Insurance Documentation",
    description: "Studio liability and instructor insurance policies",
    status: "compliant",
    progress: 100,
    lastUpdated: "2025-01-01",
    action: "View Policies",
  },
  {
    id: "cpr",
    name: "CPR/First Aid Certifications",
    description: "Staff first aid and CPR training compliance",
    status: "warning",
    progress: 70,
    lastUpdated: "2025-01-05",
    action: "Schedule Training",
  },
  {
    id: "background",
    name: "Background Checks",
    description: "Required for all staff working with minors",
    status: "compliant",
    progress: 100,
    lastUpdated: "2024-12-20",
    action: "View Records",
  },
  {
    id: "hipaa",
    name: "Health Information Privacy",
    description: "HIPAA compliance for health-related client data",
    status: "compliant",
    progress: 100,
    lastUpdated: "2025-01-12",
    action: "View Training",
  },
]

const upcomingDeadlines = [
  { item: "Sarah Johnson - RYT-500 Renewal", date: "Feb 15, 2025", daysLeft: 25 },
  { item: "Studio Liability Insurance Renewal", date: "Mar 1, 2025", daysLeft: 39 },
  { item: "Fire Safety Inspection", date: "Mar 15, 2025", daysLeft: 53 },
  { item: "Michael Chen - CPR Certification", date: "Feb 28, 2025", daysLeft: 38 },
]

export default function CompliancePage() {
  const compliantCount = complianceItems.filter(i => i.status === "compliant").length
  const totalItems = complianceItems.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compliance & Legal</h1>
        <p className="text-muted-foreground">Monitor certifications, waivers, and legal requirements</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Overall Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{Math.round((compliantCount / totalItems) * 100)}%</div>
            <p className="text-xs text-muted-foreground">{compliantCount} of {totalItems} areas compliant</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Active Waivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">5 unsigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Certified Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12/14</div>
            <p className="text-xs text-muted-foreground">2 certifications expiring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Compliance Areas</h2>
          {complianceItems.map(item => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Badge 
                        variant={
                          item.status === "compliant" ? "default" : 
                          item.status === "attention" ? "secondary" : "destructive"
                        }
                      >
                        {item.status === "compliant" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {item.status === "attention" && <Clock className="h-3 w-3 mr-1" />}
                        {item.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Button variant="outline" size="sm">{item.action}</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Compliance Rate</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Last updated: {item.lastUpdated}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Renewals and expirations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{deadline.item}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                    <Badge variant={deadline.daysLeft < 30 ? "destructive" : "outline"}>
                      {deadline.daysLeft} days
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Documents
              </CardTitle>
              <CardDescription>Legal and compliance files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Liability Waiver Template", "Privacy Policy", "Terms of Service", "Employee Handbook"].map(doc => (
                <Button key={doc} variant="ghost" className="w-full justify-between" size="sm">
                  {doc}
                  <Download className="h-4 w-4" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
