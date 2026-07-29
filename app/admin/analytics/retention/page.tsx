"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle,
  UserMinus,
  UserPlus,
  Calendar,
  Mail,
  Activity
} from "lucide-react"

// Mock retention data
const retentionMetrics = {
  overall_retention: 87,
  monthly_churn: 4.2,
  at_risk_members: 8,
  avg_member_lifetime: 14.5,
  new_members_this_month: 12,
  cancelled_this_month: 5
}

const atRiskMembers = [
  {
    id: "ar-1",
    name: "Jennifer Adams",
    email: "jennifer@email.com",
    membership: "Unlimited Monthly",
    last_visit: "18 days ago",
    risk_level: "high",
    risk_reason: "No visits in 2+ weeks, payment failed",
    visits_last_30_days: 1
  },
  {
    id: "ar-2",
    name: "Robert Kim",
    email: "robert@email.com",
    membership: "10-Class Pack",
    last_visit: "12 days ago",
    risk_level: "medium",
    risk_reason: "Decreased visit frequency",
    visits_last_30_days: 2
  },
  {
    id: "ar-3",
    name: "Maria Garcia",
    email: "maria@email.com",
    membership: "Unlimited Monthly",
    last_visit: "21 days ago",
    risk_level: "high",
    risk_reason: "No visits in 3 weeks",
    visits_last_30_days: 0
  },
]

const cohortData = [
  { month: "Aug 2024", started: 15, still_active: 12, retention: 80 },
  { month: "Sep 2024", started: 18, still_active: 15, retention: 83 },
  { month: "Oct 2024", started: 22, still_active: 19, retention: 86 },
  { month: "Nov 2024", started: 14, still_active: 13, retention: 93 },
  { month: "Dec 2024", started: 19, still_active: 18, retention: 95 },
  { month: "Jan 2025", started: 12, still_active: 12, retention: 100 },
]

const churnReasons = [
  { reason: "Moved away", count: 8, percentage: 32 },
  { reason: "Financial reasons", count: 5, percentage: 20 },
  { reason: "Schedule conflicts", count: 4, percentage: 16 },
  { reason: "Found another studio", count: 3, percentage: 12 },
  { reason: "Health issues", count: 3, percentage: 12 },
  { reason: "Other/Unknown", count: 2, percentage: 8 },
]

export default function RetentionAnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Retention & Engagement Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Monitor member retention, identify at-risk members, and reduce churn
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Retention Rate</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {retentionMetrics.overall_retention}%
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Churn</CardDescription>
            <CardTitle className="text-2xl">{retentionMetrics.monthly_churn}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>At-Risk Members</CardDescription>
            <CardTitle className="text-2xl text-amber-600">{retentionMetrics.at_risk_members}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Lifetime</CardDescription>
            <CardTitle className="text-2xl">{retentionMetrics.avg_member_lifetime} mo</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New This Month</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {retentionMetrics.new_members_this_month}
              <UserPlus className="h-4 w-4 text-green-600" />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cancelled</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {retentionMetrics.cancelled_this_month}
              <UserMinus className="h-4 w-4 text-destructive" />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="at-risk" className="space-y-6">
        <TabsList>
          <TabsTrigger value="at-risk">At-Risk Members</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="churn">Churn Reasons</TabsTrigger>
        </TabsList>

        <TabsContent value="at-risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Members at Risk of Churning
              </CardTitle>
              <CardDescription>
                Members showing signs of disengagement who may need outreach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atRiskMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        <Badge variant={member.risk_level === "high" ? "destructive" : "secondary"}>
                          {member.risk_level} risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Last visit: {member.last_visit}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {member.visits_last_30_days} visits (30 days)
                        </span>
                      </div>
                      <p className="text-sm text-amber-600 mt-1">
                        <AlertTriangle className="h-3 w-3 inline mr-1" />
                        {member.risk_reason}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Reach Out
                      </Button>
                      <Button size="sm">View Profile</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Cohort Retention</CardTitle>
              <CardDescription>
                How well we retain members based on when they joined
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Join Month</th>
                      <th className="text-center py-3 px-4">Started</th>
                      <th className="text-center py-3 px-4">Still Active</th>
                      <th className="text-center py-3 px-4">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((cohort) => (
                      <tr key={cohort.month} className="border-b">
                        <td className="py-3 px-4 font-medium">{cohort.month}</td>
                        <td className="py-3 px-4 text-center">{cohort.started}</td>
                        <td className="py-3 px-4 text-center">{cohort.still_active}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={cohort.retention >= 90 ? "default" : cohort.retention >= 80 ? "secondary" : "destructive"}>
                            {cohort.retention}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn">
          <Card>
            <CardHeader>
              <CardTitle>Cancellation Reasons (Last 6 Months)</CardTitle>
              <CardDescription>
                Understanding why members leave helps improve retention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {churnReasons.map((item) => (
                  <div key={item.reason} className="flex items-center gap-4">
                    <div className="w-36 font-medium">{item.reason}</div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <span className="font-semibold">{item.count}</span>
                      <span className="text-muted-foreground text-sm ml-1">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
