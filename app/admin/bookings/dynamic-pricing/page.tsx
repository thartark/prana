"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Clock, DollarSign, Users, Zap } from "lucide-react"

export default function DynamicPricingPage() {
  const [enableDynamicPricing, setEnableDynamicPricing] = useState(true)
  const [lastMinuteDiscount, setLastMinuteDiscount] = useState([20])
  const [peakHourMultiplier, setPeakHourMultiplier] = useState([1.2])

  const pricingRules = [
    {
      id: 1,
      name: "Last-Minute Discount",
      description: "Offer discounts for spots within 2 hours of class start",
      enabled: true,
      discount: "20%",
      impact: "+8% utilization",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      id: 2,
      name: "Peak Hour Premium",
      description: "Higher pricing for prime time slots (6-8 PM)",
      enabled: true,
      premium: "+20%",
      impact: "+$340/week revenue",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      id: 3,
      name: "Loyalty Pricing",
      description: "Progressive discounts based on attendance streak",
      enabled: true,
      discount: "Up to 15%",
      impact: "Improved retention",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 4,
      name: "Early Bird Pricing",
      description: "Lower rates for booking 7+ days in advance",
      enabled: false,
      discount: "10%",
      impact: "Better planning",
      icon: Zap,
      color: "text-purple-600",
    },
  ]

  const performanceMetrics = [
    {
      class: "Power Vinyasa - Mon 6PM",
      standardPrice: "$18",
      dynamicPrice: "$22",
      utilization: "98%",
      revenue: "+$88/week",
      trend: "up",
    },
    {
      class: "Gentle Flow - Wed 2PM",
      standardPrice: "$18",
      dynamicPrice: "$14",
      utilization: "85% (+12%)",
      revenue: "+$42/week",
      trend: "up",
    },
    {
      class: "Hot Yoga - Fri 7PM",
      standardPrice: "$20",
      dynamicPrice: "$24",
      utilization: "100%",
      revenue: "+$120/week",
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dynamic Pricing Engine</h1>
          <p className="text-muted-foreground">AI-powered pricing optimization for maximum revenue and utilization</p>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="dynamic-pricing">Dynamic Pricing</Label>
          <Switch id="dynamic-pricing" checked={enableDynamicPricing} onCheckedChange={setEnableDynamicPricing} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue Impact</CardDescription>
            <CardTitle className="text-3xl text-green-600">+$590/week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Since enabling dynamic pricing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Utilization</CardDescription>
            <CardTitle className="text-3xl">94%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">+7% from static pricing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Member Satisfaction</CardDescription>
            <CardTitle className="text-3xl">4.7/5</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Fair pricing perception maintained</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Rules Configuration</CardTitle>
          <CardDescription>Configure automatic pricing adjustments based on demand patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pricingRules.map((rule) => {
              const Icon = rule.icon
              return (
                <div key={rule.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-lg bg-muted ${rule.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <Switch checked={rule.enabled} />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      {rule.discount && (
                        <Badge variant="outline" className="text-orange-600">
                          {rule.discount} discount
                        </Badge>
                      )}
                      {rule.premium && (
                        <Badge variant="outline" className="text-green-600">
                          {rule.premium} premium
                        </Badge>
                      )}
                      <span className="text-muted-foreground">Impact: {rule.impact}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fine-Tune Pricing Parameters</CardTitle>
          <CardDescription>Adjust the sensitivity of automatic pricing adjustments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Last-Minute Discount Percentage</Label>
                <span className="text-sm font-medium">{lastMinuteDiscount[0]}%</span>
              </div>
              <Slider
                value={lastMinuteDiscount}
                onValueChange={setLastMinuteDiscount}
                min={10}
                max={40}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Applied to classes with available spots within 2 hours of start time
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Peak Hour Price Multiplier</Label>
                <span className="text-sm font-medium">{peakHourMultiplier[0].toFixed(1)}x</span>
              </div>
              <Slider
                value={peakHourMultiplier}
                onValueChange={setPeakHourMultiplier}
                min={1}
                max={1.5}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Applied to high-demand time slots (typically 6-8 PM weekdays)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance by Class</CardTitle>
          <CardDescription>How dynamic pricing is impacting individual classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold">{metric.class}</h4>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Standard:</span>
                      <span className="font-medium">{metric.standardPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">Dynamic:</span>
                      <span className="font-medium text-green-600">{metric.dynamicPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="secondary">{metric.utilization}</Badge>
                  <p className="text-sm font-medium text-green-600">{metric.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
