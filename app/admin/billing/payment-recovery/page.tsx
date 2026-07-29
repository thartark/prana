"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertTriangle, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  TrendingUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock failed payment data
const failedPayments = [
  {
    id: "fp-1",
    member_name: "Sarah Johnson",
    email: "sarah@email.com",
    amount: 89.00,
    failed_date: "2025-01-18",
    attempts: 2,
    last_attempt: "2025-01-20",
    reason: "Insufficient funds",
    membership: "Unlimited Monthly",
    status: "pending_retry"
  },
  {
    id: "fp-2",
    member_name: "Mike Chen",
    email: "mike@email.com",
    amount: 149.00,
    failed_date: "2025-01-15",
    attempts: 3,
    last_attempt: "2025-01-19",
    reason: "Card expired",
    membership: "Annual Unlimited",
    status: "action_required"
  },
  {
    id: "fp-3",
    member_name: "Emma Davis",
    email: "emma@email.com",
    amount: 45.00,
    failed_date: "2025-01-19",
    attempts: 1,
    last_attempt: "2025-01-19",
    reason: "Card declined",
    membership: "10-Class Pack",
    status: "pending_retry"
  },
]

const recoveryStats = {
  total_failed: 12,
  recovered_this_month: 8,
  recovery_rate: 67,
  revenue_recovered: 892,
  pending_recovery: 283
}

export default function PaymentRecoveryPage() {
  const { toast } = useToast()
  const [autoRetry, setAutoRetry] = useState(true)
  const [emailReminders, setEmailReminders] = useState(true)
  const [smsReminders, setSmsReminders] = useState(false)

  const handleRetryPayment = (paymentId: string) => {
    toast({
      title: "Payment retry initiated",
      description: "We're attempting to process the payment again.",
    })
  }

  const handleSendReminder = (paymentId: string, type: "email" | "sms") => {
    toast({
      title: `${type === "email" ? "Email" : "SMS"} reminder sent`,
      description: "The member has been notified about their failed payment.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Failed Payment Recovery</h1>
        <p className="text-muted-foreground mt-1">
          Automatically recover failed payments and reduce churn
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Failed This Month</CardDescription>
            <CardTitle className="text-2xl">{recoveryStats.total_failed}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Recovered</CardDescription>
            <CardTitle className="text-2xl text-green-600">{recoveryStats.recovered_this_month}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Recovery Rate</CardDescription>
            <CardTitle className="text-2xl">{recoveryStats.recovery_rate}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue Recovered</CardDescription>
            <CardTitle className="text-2xl text-green-600">${recoveryStats.revenue_recovered}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Recovery</CardDescription>
            <CardTitle className="text-2xl text-amber-600">${recoveryStats.pending_recovery}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="failed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="failed">Failed Payments</TabsTrigger>
          <TabsTrigger value="settings">Automation Settings</TabsTrigger>
          <TabsTrigger value="history">Recovery History</TabsTrigger>
        </TabsList>

        <TabsContent value="failed" className="space-y-4">
          {failedPayments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{payment.member_name}</h3>
                      <Badge variant={payment.status === "action_required" ? "destructive" : "secondary"}>
                        {payment.status === "action_required" ? "Action Required" : "Pending Retry"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{payment.email}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        ${payment.amount.toFixed(2)}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        {payment.membership}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        Failed {payment.failed_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                        {payment.attempts} attempts
                      </span>
                    </div>
                    <p className="text-sm text-destructive mt-2">
                      <AlertTriangle className="h-3 w-3 inline mr-1" />
                      {payment.reason}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => handleRetryPayment(payment.id)}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Retry
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSendReminder(payment.id, "email")}>
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSendReminder(payment.id, "sms")}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      SMS
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Recovery Settings</CardTitle>
              <CardDescription>Configure how failed payments are automatically handled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Retry Failed Payments</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically retry failed payments after 3 days
                  </p>
                </div>
                <Switch checked={autoRetry} onCheckedChange={setAutoRetry} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email reminders to update payment info
                  </p>
                </div>
                <Switch checked={emailReminders} onCheckedChange={setEmailReminders} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send SMS reminders for urgent payment issues
                  </p>
                </div>
                <Switch checked={smsReminders} onCheckedChange={setSmsReminders} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retry Schedule</CardTitle>
              <CardDescription>When automatic retries are attempted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge>1st Retry</Badge>
                  <span className="text-sm">3 days after failure</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>2nd Retry</Badge>
                  <span className="text-sm">7 days after failure</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>3rd Retry</Badge>
                  <span className="text-sm">14 days after failure</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">Final Notice</Badge>
                  <span className="text-sm">21 days - membership suspended</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Recovery Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { member: "Lisa Park", amount: 89, status: "recovered", date: "Jan 20" },
                  { member: "Tom Wilson", amount: 149, status: "recovered", date: "Jan 19" },
                  { member: "Amy Lee", amount: 45, status: "failed", date: "Jan 18" },
                  { member: "John Smith", amount: 89, status: "recovered", date: "Jan 17" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      {item.status === "recovered" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium">{item.member}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${item.status === "recovered" ? "text-green-600" : "text-destructive"}`}>
                        ${item.amount}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">{item.status}</p>
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
