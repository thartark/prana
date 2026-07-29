"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, CreditCard, DollarSign, Plus, CheckCircle2, AlertCircle } from "lucide-react"

export default function PaymentPlansPage() {
  const paymentPlans = [
    {
      id: "1",
      customer: "Sarah Johnson",
      membership: "Unlimited Monthly",
      total: 149,
      paid: 75,
      remaining: 74,
      installments: "2 of 4",
      nextPayment: "2025-02-01",
      status: "active",
    },
    {
      id: "2",
      customer: "Michael Chen",
      membership: "20 Class Pack",
      total: 280,
      paid: 140,
      remaining: 140,
      installments: "2 of 4",
      nextPayment: "2025-02-15",
      status: "active",
    },
    {
      id: "3",
      customer: "Emily Rodriguez",
      membership: "Teacher Training",
      total: 2500,
      paid: 1000,
      remaining: 1500,
      installments: "2 of 5",
      nextPayment: "2025-01-25",
      status: "active",
    },
    {
      id: "4",
      customer: "David Kim",
      membership: "Annual Unlimited",
      total: 1200,
      paid: 400,
      remaining: 800,
      installments: "1 of 3",
      nextPayment: "2025-02-10",
      status: "active",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payment Plans</h1>
          <p className="text-muted-foreground">Manage installment payments and flexible billing</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Payment Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Payment Plan</DialogTitle>
              <DialogDescription>Set up a custom installment plan for a customer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Input id="customer" placeholder="Search customer..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total">Total Amount</Label>
                <Input id="total" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="installments">Number of Installments</Label>
                <Input id="installments" type="number" placeholder="4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Payment Frequency</Label>
                <Input id="frequency" placeholder="e.g., Monthly, Bi-weekly" />
              </div>
              <Button className="w-full">Create Plan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Plans</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Outstanding</p>
                <p className="text-2xl font-bold">$18,450</p>
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
                <p className="text-sm text-muted-foreground mb-1">Due This Month</p>
                <p className="text-2xl font-bold">$3,240</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Past Due</p>
                <p className="text-2xl font-bold">$0</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Payment Plans</CardTitle>
          <CardDescription>Customer installment payment schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Next Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentPlans.map((plan) => {
                const progress = (plan.paid / plan.total) * 100
                return (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.customer}</TableCell>
                    <TableCell>{plan.membership}</TableCell>
                    <TableCell>${plan.total}</TableCell>
                    <TableCell className="text-green-600 font-medium">${plan.paid}</TableCell>
                    <TableCell>${plan.remaining}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{plan.installments} installments</p>
                      </div>
                    </TableCell>
                    <TableCell>{plan.nextPayment}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {plan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
