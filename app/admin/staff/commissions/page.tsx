"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Calendar, Download, CheckCircle2 } from "lucide-react"

export default function CommissionsPage() {
  const commissions = [
    {
      id: "1",
      instructor: "Sarah Martinez",
      period: "January 2025",
      classes: 48,
      revenue: 12400,
      rate: 15,
      commission: 1860,
      status: "paid",
      paidDate: "2025-02-01",
    },
    {
      id: "2",
      instructor: "Michael Chen",
      period: "January 2025",
      classes: 32,
      revenue: 8900,
      rate: 15,
      commission: 1335,
      status: "pending",
      paidDate: null,
    },
    {
      id: "3",
      instructor: "Emily Rodriguez",
      period: "January 2025",
      classes: 42,
      revenue: 11200,
      rate: 15,
      commission: 1680,
      status: "pending",
      paidDate: null,
    },
    {
      id: "4",
      instructor: "Sarah Martinez",
      period: "December 2024",
      classes: 45,
      revenue: 11800,
      rate: 15,
      commission: 1770,
      status: "paid",
      paidDate: "2025-01-01",
    },
  ]

  const getStatusBadge = (status: string) => {
    if (status === "paid") {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Paid
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
        Pending
      </Badge>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Commission Tracking</h1>
          <p className="text-muted-foreground">Manage instructor commission payments</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Commissions</p>
                <p className="text-2xl font-bold">$4,875</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Payouts</p>
                <p className="text-2xl font-bold">$3,015</p>
                <p className="text-xs text-orange-600 mt-1">2 instructors</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Paid This Month</p>
                <p className="text-2xl font-bold">$1,860</p>
                <p className="text-xs text-muted-foreground mt-1">1 instructor</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Commission</p>
                <p className="text-2xl font-bold">$1,625</p>
                <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
          <CardDescription>Track all instructor commission payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell className="font-medium">{commission.instructor}</TableCell>
                  <TableCell>{commission.period}</TableCell>
                  <TableCell>{commission.classes}</TableCell>
                  <TableCell>${commission.revenue.toLocaleString()}</TableCell>
                  <TableCell>{commission.rate}%</TableCell>
                  <TableCell className="font-semibold">${commission.commission.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(commission.status)}</TableCell>
                  <TableCell>{commission.paidDate || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Commission Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Structure</CardTitle>
          <CardDescription>Current commission rates and tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Base Rate</h4>
              <p className="text-3xl font-bold text-primary mb-2">15%</p>
              <p className="text-sm text-muted-foreground">Standard commission for all classes</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Workshops & Events</h4>
              <p className="text-3xl font-bold text-primary mb-2">20%</p>
              <p className="text-sm text-muted-foreground">Special events and workshops</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Private Sessions</h4>
              <p className="text-3xl font-bold text-primary mb-2">25%</p>
              <p className="text-sm text-muted-foreground">One-on-one and private group</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 text-blue-900 rounded-lg text-sm">
            <p className="font-medium mb-2">Bonus Tiers:</p>
            <ul className="space-y-1">
              <li>• 40+ classes per month: +2% bonus</li>
              <li>• Average rating 4.8+: +1% bonus</li>
              <li>• 90%+ class fill rate: +1% bonus</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
