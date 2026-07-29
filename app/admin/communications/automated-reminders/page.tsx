"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mail, 
  MessageSquare, 
  Bell,
  Clock,
  Calendar,
  Users,
  Settings,
  Plus,
  Pencil,
  Trash2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const emailReminders = [
  {
    id: "er-1",
    name: "Class Reminder - 24 Hours",
    trigger: "24 hours before class",
    type: "email",
    enabled: true,
    sent_last_30_days: 234
  },
  {
    id: "er-2",
    name: "Class Reminder - 2 Hours",
    trigger: "2 hours before class",
    type: "email",
    enabled: true,
    sent_last_30_days: 198
  },
  {
    id: "er-3",
    name: "Membership Expiring Soon",
    trigger: "7 days before expiration",
    type: "email",
    enabled: true,
    sent_last_30_days: 45
  },
  {
    id: "er-4",
    name: "Payment Due Reminder",
    trigger: "3 days before due date",
    type: "email",
    enabled: true,
    sent_last_30_days: 67
  },
  {
    id: "er-5",
    name: "Welcome Email",
    trigger: "Immediately after signup",
    type: "email",
    enabled: true,
    sent_last_30_days: 23
  },
  {
    id: "er-6",
    name: "We Miss You",
    trigger: "14 days without a visit",
    type: "email",
    enabled: true,
    sent_last_30_days: 12
  },
]

const smsReminders = [
  {
    id: "sr-1",
    name: "Class Reminder - 2 Hours",
    trigger: "2 hours before class",
    type: "sms",
    enabled: true,
    sent_last_30_days: 156
  },
  {
    id: "sr-2",
    name: "Waitlist Spot Available",
    trigger: "When spot opens",
    type: "sms",
    enabled: true,
    sent_last_30_days: 34
  },
  {
    id: "sr-3",
    name: "Class Cancelled",
    trigger: "When class is cancelled",
    type: "sms",
    enabled: true,
    sent_last_30_days: 8
  },
]

export default function AutomatedRemindersPage() {
  const { toast } = useToast()
  const [reminders, setReminders] = useState([...emailReminders, ...smsReminders])

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ))
    toast({
      title: "Reminder updated",
      description: "The reminder setting has been saved.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Automated Reminders</h1>
          <p className="text-muted-foreground mt-1">
            Configure email and SMS notifications for your members
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Reminder
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Emails Sent (30 days)</CardDescription>
            <CardTitle className="text-2xl">579</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>SMS Sent (30 days)</CardDescription>
            <CardTitle className="text-2xl">198</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Rate</CardDescription>
            <CardTitle className="text-2xl">68%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Reminders</CardDescription>
            <CardTitle className="text-2xl">{reminders.filter(r => r.enabled).length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="email" className="space-y-6">
        <TabsList>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Reminders
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            SMS Reminders
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          {emailReminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{reminder.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {reminder.trigger}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {reminder.sent_last_30_days} sent
                    </span>
                    <Switch 
                      checked={reminders.find(r => r.id === reminder.id)?.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          {smsReminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{reminder.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {reminder.trigger}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {reminder.sent_last_30_days} sent
                    </span>
                    <Switch 
                      checked={reminders.find(r => r.id === reminder.id)?.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure default email preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input defaultValue="Trailside Yoga & Beyond" />
                </div>
                <div className="space-y-2">
                  <Label>Reply-To Email</Label>
                  <Input defaultValue="hello@trailsideyoga.com" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Include Unsubscribe Link</Label>
                    <p className="text-sm text-muted-foreground">Required for marketing emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Settings</CardTitle>
                <CardDescription>Configure default SMS preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>SMS Provider</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="messagebird">MessageBird</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Include Studio Name</Label>
                    <p className="text-sm text-muted-foreground">Add "Trailside Yoga" to messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">Don't send between 9pm-8am</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
