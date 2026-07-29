"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, DollarSign, Mail, Phone, Clock, Ban } from "lucide-react"

export default function LatePaymentsPage() {
  const latePayments = [
    {
      id: "1",
      customer: "Jennifer Martinez",
      email: "jennifer@email.com",
      phone: "(555) 234-5678",
      amount: 149,
      dueDate: "2024-12-15",
      daysOverdue: 40,
      type: "Membership",
      lateFee: 15,
      attempts: 2,
      lastContact: "2025-01-10",
    },
    {
      id: "2",
      customer: "Robert Taylor",
      email: "robert@email.com",
      phone: "(555) 345-6789",
      amount: 89,
      dueDate: "2024-12-28",
      daysOverdue: 27,
      type: "Class Pack",
      lateFee: 10,
      attempts: 1,
      lastContact: "2025-01-15",
    },
    {
      id: "3",
      customer: "Amanda White",
      email: "amanda@email.com",
      phone: "(555) 456-7890",
      amount: 199,
      dueDate: "2025-01-05",
      daysOverdue: 19,
      type: "Workshop",
      lateFee: 20,
      attempts: 3,
      lastContact: "2025-01-18",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Late Payments & Collections</h1>
        <p className="text-muted-foreground">Track overdue payments and manage follow-ups</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Overdue</p>
                <p className="text-2xl font-bold text-red-600">$1,847</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Late Fees</p>
                <p className="text-2xl font-bold">$185</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Accounts</p>
                <p className="text-2xl font-bold">13</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Suspended</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Ban className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Late Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Overdue Accounts</CardTitle>
          <CardDescription>Customers with outstanding late payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Late Fee</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Follow-ups</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latePayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.customer}</div>
                      <div className="text-xs text-muted-foreground">Due: {payment.dueDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 mb-1">
                        <Mail className="h-3 w-3" />
                        {payment.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {payment.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-red-600">${payment.amount}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-orange-600">+${payment.lateFee}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        payment.daysOverdue > 30
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                      }
                    >
                      {payment.daysOverdue} days
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{payment.attempts} attempts</div>
                      <div className="text-xs text-muted-foreground">Last: {payment.lastContact}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Late Fee Policy */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Late Payment Policy</CardTitle>
          <CardDescription>Automated fee calculation and enforcement rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Grace Period</h4>
              <p className="text-2xl font-bold text-primary mb-1">5 days</p>
              <p className="text-sm text-muted-foreground">No fees applied</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Late Fee</h4>
              <p className="text-2xl font-bold text-primary mb-1">$10 or 10%</p>
              <p className="text-sm text-muted-foreground">Whichever is greater</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Suspension</h4>
              <p className="text-2xl font-bold text-primary mb-1">30 days</p>
              <p className="text-sm text-muted-foreground">Account suspended</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 text-blue-900 rounded-lg text-sm">
            <p className="font-medium mb-2">Automatic Actions:</p>
            <ul className="space-y-1 text-sm">
              <li>• Day 5: First reminder email sent automatically</li>
              <li>• Day 10: Second reminder with late fee notice</li>
              <li>• Day 15: SMS notification sent</li>
              <li>• Day 30: Account suspended, manual collection required</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
