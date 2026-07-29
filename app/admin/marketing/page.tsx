"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mail, 
  Users, 
  TrendingUp, 
  Calendar,
  Send,
  Target,
  Gift,
  Megaphone,
  BarChart,
  Plus,
  Eye,
  MousePointer
} from "lucide-react"

const campaigns = [
  {
    id: "1",
    name: "New Year New You",
    type: "email",
    status: "active",
    sent: 1250,
    opened: 487,
    clicked: 156,
    conversions: 23,
    startDate: "2025-01-01",
  },
  {
    id: "2",
    name: "Valentine's Partner Yoga",
    type: "email",
    status: "scheduled",
    sent: 0,
    opened: 0,
    clicked: 0,
    conversions: 0,
    startDate: "2025-02-01",
  },
  {
    id: "3",
    name: "Refer a Friend Bonus",
    type: "referral",
    status: "active",
    sent: 0,
    opened: 0,
    clicked: 0,
    conversions: 45,
    startDate: "2024-12-15",
  },
]

const promotions = [
  {
    id: "1",
    name: "First Month Free",
    type: "New Member",
    discount: "100%",
    uses: 12,
    maxUses: 50,
    validUntil: "2025-02-28",
    status: "active",
  },
  {
    id: "2",
    name: "SPRING25",
    type: "Seasonal",
    discount: "25%",
    uses: 34,
    maxUses: 100,
    validUntil: "2025-03-31",
    status: "active",
  },
  {
    id: "3",
    name: "TEACHER10",
    type: "Teacher Discount",
    discount: "10%",
    uses: 8,
    maxUses: null,
    validUntil: null,
    status: "active",
  },
]

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("campaigns")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing</h1>
          <p className="text-muted-foreground">Campaigns, promotions, and member engagement</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Email Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,847</div>
            <p className="text-xs text-green-600">+124 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Avg. Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">38.9%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 21%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Click Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 2.6%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Active Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-green-600">$2,250 in rewards</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="campaigns">
            <Megaphone className="h-4 w-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <Gift className="h-4 w-4 mr-2" />
            Promotions
          </TabsTrigger>
          <TabsTrigger value="automation">
            <Target className="h-4 w-4 mr-2" />
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map(campaign => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {campaign.type === "email" ? <Mail className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>
                        {campaign.type === "email" ? "Email Campaign" : "Referral Program"} • Started {campaign.startDate}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {campaign.type === "email" ? (
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-2xl font-bold">{campaign.sent.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Sent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.opened.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Opened ({campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0}%)</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.clicked.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Clicked ({campaign.opened > 0 ? Math.round((campaign.clicked / campaign.opened) * 100) : 0}%)</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{campaign.conversions}</p>
                      <p className="text-sm text-muted-foreground">Conversions</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold">{campaign.conversions} referrals</p>
                    <p className="text-sm text-muted-foreground">New members from referrals</p>
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                  {campaign.status === "active" && (
                    <Button variant="outline" size="sm">Pause Campaign</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotions.map(promo => (
              <Card key={promo.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{promo.name}</CardTitle>
                    <Badge variant={promo.status === "active" ? "default" : "secondary"}>
                      {promo.status}
                    </Badge>
                  </div>
                  <CardDescription>{promo.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-primary">{promo.discount} OFF</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uses</span>
                      <span>{promo.uses}{promo.maxUses ? `/${promo.maxUses}` : ""}</span>
                    </div>
                    {promo.validUntil && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valid Until</span>
                        <span>{promo.validUntil}</span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">Edit Promotion</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Automation</CardTitle>
              <CardDescription>Automated email sequences for member engagement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Welcome Series", triggers: "New member signup", emails: 5, active: true },
                { name: "Win-Back Campaign", triggers: "30 days inactive", emails: 3, active: true },
                { name: "Birthday Greeting", triggers: "Member birthday", emails: 1, active: true },
                { name: "Class Reminder", triggers: "24 hours before class", emails: 1, active: true },
                { name: "Membership Renewal", triggers: "7 days before expiry", emails: 2, active: false },
              ].map((automation, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{automation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Trigger: {automation.triggers} • {automation.emails} email{automation.emails > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={automation.active ? "default" : "outline"}>
                      {automation.active ? "Active" : "Paused"}
                    </Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
