"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  CreditCard, 
  Mail, 
  Calendar, 
  Video, 
  MessageSquare, 
  BarChart,
  Zap,
  CheckCircle,
  ExternalLink
} from "lucide-react"

const integrations = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Accept payments, manage subscriptions, and handle refunds",
    icon: CreditCard,
    category: "Payments",
    connected: true,
    status: "active",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing, newsletters, and automated campaigns",
    icon: Mail,
    category: "Marketing",
    connected: true,
    status: "active",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync class schedules with Google Calendar",
    icon: Calendar,
    category: "Scheduling",
    connected: false,
    status: "disconnected",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Host virtual classes and teacher trainings",
    icon: Video,
    category: "Virtual Classes",
    connected: true,
    status: "active",
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "SMS notifications and reminders for clients",
    icon: MessageSquare,
    category: "Communications",
    connected: false,
    status: "disconnected",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Track website traffic and user behavior",
    icon: BarChart,
    category: "Analytics",
    connected: true,
    status: "active",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5,000+ apps and automate workflows",
    icon: Zap,
    category: "Automation",
    connected: false,
    status: "disconnected",
  },
]

export default function IntegrationsPage() {
  const [activeIntegrations, setActiveIntegrations] = useState(
    integrations.filter(i => i.connected).map(i => i.id)
  )

  const categories = Array.from(new Set(integrations.map(i => i.category)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">Connect your favorite tools and services</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeIntegrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{integrations.length - activeIntegrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {integrations
              .filter(i => i.category === category)
              .map(integration => (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <integration.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription>{integration.description}</CardDescription>
                        </div>
                      </div>
                      {integration.connected ? (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline">Available</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      {integration.connected ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Enabled</span>
                            <Switch 
                              checked={activeIntegrations.includes(integration.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setActiveIntegrations([...activeIntegrations, integration.id])
                                } else {
                                  setActiveIntegrations(activeIntegrations.filter(id => id !== integration.id))
                                }
                              }}
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </>
                      ) : (
                        <Button className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Connect {integration.name}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
