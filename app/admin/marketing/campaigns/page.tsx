"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Send, Users, TrendingUp, Plus, Eye, Edit, Copy } from "lucide-react"

export default function EmailCampaignsPage() {
  const campaigns = [
    {
      id: "1",
      name: "New Year Wellness Challenge",
      status: "sent",
      sent: 1250,
      opened: 687,
      clicked: 134,
      openRate: 55,
      clickRate: 10.7,
      date: "2025-01-01",
    },
    {
      id: "2",
      name: "Spring Workshop Series",
      status: "scheduled",
      sent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      date: "2025-02-15",
    },
    {
      id: "3",
      name: "Member Appreciation Week",
      status: "draft",
      sent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      date: null,
    },
    {
      id: "4",
      name: "Class Schedule Update",
      status: "sent",
      sent: 1450,
      opened: 1015,
      clicked: 289,
      openRate: 70,
      clickRate: 20,
      date: "2025-01-15",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Sent
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Draft
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Email Campaigns</h1>
          <p className="text-muted-foreground">Create and manage email marketing campaigns</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>Design and schedule your email marketing campaign</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="e.g., Spring Wellness Special" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input id="subject" placeholder="Compelling subject line..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="audience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="active">Active Members</SelectItem>
                    <SelectItem value="inactive">Inactive Members (30+ days)</SelectItem>
                    <SelectItem value="new">New Members (Last 30 days)</SelectItem>
                    <SelectItem value="unlimited">Unlimited Plan Holders</SelectItem>
                    <SelectItem value="classpack">Class Pack Holders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Email Template</Label>
                <Select defaultValue="newsletter">
                  <SelectTrigger id="template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="event">Event Invitation</SelectItem>
                    <SelectItem value="reminder">Class Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea id="content" placeholder="Write your message..." rows={6} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="send-date">Send Date</Label>
                  <Input id="send-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="send-time">Send Time</Label>
                  <Input id="send-time" type="time" defaultValue="09:00" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Save as Draft</Button>
                <Button className="flex-1">Schedule Campaign</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sent</p>
                <p className="text-2xl font-bold">8,450</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Open Rate</p>
                <p className="text-2xl font-bold">62.5%</p>
                <p className="text-xs text-green-600 mt-1">+5.2% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Click Rate</p>
                <p className="text-2xl font-bold">15.3%</p>
                <p className="text-xs text-green-600 mt-1">+2.1% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Subscribers</p>
                <p className="text-2xl font-bold">1,847</p>
                <p className="text-xs text-muted-foreground mt-1">Active contacts</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Manage your email marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      {getStatusBadge(campaign.status)}
                    </div>
                    {campaign.date && <p className="text-sm text-muted-foreground">Sent: {campaign.date}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </Button>
                  </div>
                </div>

                {campaign.status === "sent" && (
                  <div className="grid grid-cols-4 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sent</p>
                      <p className="text-lg font-semibold">{campaign.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Opened</p>
                      <p className="text-lg font-semibold">
                        {campaign.opened.toLocaleString()}
                        <span className="text-sm text-green-600 ml-2">({campaign.openRate}%)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Clicked</p>
                      <p className="text-lg font-semibold">
                        {campaign.clicked.toLocaleString()}
                        <span className="text-sm text-blue-600 ml-2">({campaign.clickRate}%)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Conversions</p>
                      <p className="text-lg font-semibold">
                        {Math.floor(campaign.clicked * 0.25)}
                        <span className="text-sm text-purple-600 ml-2">
                          ({(((campaign.clicked * 0.25) / campaign.sent) * 100).toFixed(1)}%)
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automated Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Campaigns</CardTitle>
          <CardDescription>Set up automated email sequences triggered by user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold mb-1">Welcome Series</h4>
                  <p className="text-sm text-muted-foreground">3 emails over 7 days</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <p className="text-sm mb-3">Triggered when: New member signs up</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Edit Sequence
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold mb-1">Re-engagement</h4>
                  <p className="text-sm text-muted-foreground">2 emails over 14 days</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <p className="text-sm mb-3">Triggered when: No attendance for 30 days</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Edit Sequence
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold mb-1">Membership Expiring</h4>
                  <p className="text-sm text-muted-foreground">1 email 7 days before</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <p className="text-sm mb-3">Triggered when: Membership expires in 7 days</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Edit Sequence
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold mb-1">Birthday Celebration</h4>
                  <p className="text-sm text-muted-foreground">1 email on birthday</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <p className="text-sm mb-3">Triggered when: Member's birthday</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Edit Sequence
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Create New Automation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
