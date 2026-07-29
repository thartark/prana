"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  CreditCard,
  Smartphone,
  Plus,
  Check,
  Lock,
  Trash2,
  Star,
  Apple,
  Chrome,
  Snowflake,
  ArrowUpCircle,
  RefreshCw,
  UserPlus,
  Wallet,
  Receipt,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function FinancesHubPage() {
  const [selectedMethod, setSelectedMethod] = useState("card-1")

  const savedMethods = [
    { id: "card-1", type: "card", brand: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: "card-2", type: "card", brand: "Mastercard", last4: "8888", expiry: "03/26", isDefault: false },
  ]

  const activeMembership = {
    name: "Unlimited Monthly",
    description: "Unlimited classes per month",
    status: "active",
    start_date: "2024-01-01",
    end_date: "2025-01-01",
    classes_remaining: null,
    auto_renew: true,
    price: 149,
  }

  const paymentHistory = [
    { id: 1, date: "2024-12-01", amount: 149, description: "Monthly Membership", status: "paid" },
    { id: 2, date: "2024-11-01", amount: 149, description: "Monthly Membership", status: "paid" },
    { id: 3, date: "2024-10-01", amount: 149, description: "Monthly Membership", status: "paid" },
  ]

  const upcomingPayments = [{ id: 1, date: "2025-01-01", amount: 149, description: "Monthly Membership Renewal" }]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Finance Hub</h1>
          <p className="text-muted-foreground">Manage payments, membership, and billing in one place</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Membership</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeMembership.name}</div>
                  <p className="text-xs text-muted-foreground">${activeMembership.price}/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${upcomingPayments[0].amount}</div>
                  <p className="text-xs text-muted-foreground">Due Jan 1, 2025</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$447</div>
                  <p className="text-xs text-muted-foreground">Last 3 months</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Scheduled charges for your membership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${payment.amount}</p>
                        <Badge variant="outline">Auto-pay</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                <Button variant="outline" asChild>
                  <Link href="/memberships">
                    <ArrowUpCircle className="mr-2 h-4 w-4" />
                    Upgrade Membership
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/shop">
                    <Wallet className="mr-2 h-4 w-4" />
                    Purchase Credits
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Payments
                </CardTitle>
                <CardDescription>Quick and secure checkout with mobile wallets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" size="lg" className="h-auto py-6 justify-start bg-transparent">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center">
                        <Apple className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold">Apple Pay</div>
                        <div className="text-sm text-muted-foreground">iPhone & iPad</div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Enabled
                      </Badge>
                    </div>
                  </Button>

                  <Button variant="outline" size="lg" className="h-auto py-6 justify-start bg-transparent">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-12 w-12 rounded-lg bg-white border-2 flex items-center justify-center">
                        <Chrome className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold">Google Pay</div>
                        <div className="text-sm text-muted-foreground">Android devices</div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Enabled
                      </Badge>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Saved Cards
                </CardTitle>
                <CardDescription>Your stored payment cards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
                  {savedMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                        selectedMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center gap-4 cursor-pointer flex-1">
                          <div className="h-10 w-16 rounded border-2 border-border flex items-center justify-center text-xs font-semibold bg-white">
                            {method.brand}
                          </div>
                          <div>
                            <div className="font-medium">
                              {method.brand} ending in {method.last4}
                            </div>
                            <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                          </div>
                        </Label>
                        {method.isDefault && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </RadioGroup>

                <Separator />

                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Card
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Payment Method</CardTitle>
                <CardDescription>Enter your card details to save for future payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>

                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg text-sm">
                  <Lock className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <p className="text-gray-700">Your payment information is encrypted and stored securely</p>
                </div>

                <Button className="w-full" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Save Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Membership Tab */}
          <TabsContent value="membership" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{activeMembership.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{activeMembership.description}</p>
                  </div>
                  <Badge variant="default" className="text-sm">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Start Date</span>
                    <span className="font-medium">{new Date(activeMembership.start_date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">End Date</span>
                    <span className="font-medium">{new Date(activeMembership.end_date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Classes Remaining</span>
                    <span className="font-medium">
                      {activeMembership.classes_remaining !== null ? activeMembership.classes_remaining : "Unlimited"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Auto-Renew</span>
                    <Badge variant={activeMembership.auto_renew ? "default" : "secondary"}>
                      {activeMembership.auto_renew ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/membership/freeze">
                      <Snowflake className="mr-2 h-4 w-4" />
                      Freeze Membership
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/membership/upgrade">
                      <ArrowUpCircle className="mr-2 h-4 w-4" />
                      Upgrade
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/membership/auto-renew">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Auto-Renew Settings
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/membership/transfer">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Transfer
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All your past transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                          <Receipt className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${payment.amount}</p>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" />
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
