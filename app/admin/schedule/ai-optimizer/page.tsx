"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, CloudRain, Users, Zap, Clock, MapPin, Thermometer } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AIScheduleOptimizerPage() {
  const [isOptimizing, setIsOptimizing] = useState(false)

  const predictions = [
    {
      id: 1,
      type: "High Demand Prediction",
      timeSlot: "Monday 6:00 PM",
      confidence: 94,
      suggestion: "Add extra Power Vinyasa class",
      impact: "+$450/week estimated revenue",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "Weather Adaptation",
      timeSlot: "Saturday 10:00 AM",
      confidence: 87,
      suggestion: "Move Hot Yoga earlier due to heat wave forecast",
      impact: "Improved attendance & comfort",
      icon: Thermometer,
      color: "text-orange-600",
    },
    {
      id: 3,
      type: "Teacher Compatibility",
      timeSlot: "Wednesday 7:30 AM",
      confidence: 91,
      suggestion: "Assign Sarah to Restorative (higher ratings)",
      impact: "+0.4 stars average rating",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 4,
      type: "Room Optimization",
      timeSlot: "Thursday 5:30 PM",
      confidence: 88,
      suggestion: "Switch to main studio (23 bookings expected)",
      impact: "Better space utilization",
      icon: MapPin,
      color: "text-purple-600",
    },
  ]

  const seasonalAdjustments = [
    {
      season: "Summer",
      adjustments: [
        "Reduce hot yoga frequency by 20%",
        "Add outdoor morning classes",
        "Shift evening classes 30min later",
      ],
      impact: "15% attendance improvement",
    },
    {
      season: "Winter",
      adjustments: ["Increase restorative classes by 30%", "Add more hot yoga sessions", "Earlier evening start times"],
      impact: "12% revenue increase",
    },
  ]

  const optimizationMetrics = [
    { label: "Schedule Efficiency", value: 87, target: 90 },
    { label: "Room Utilization", value: 78, target: 85 },
    { label: "Teacher Load Balance", value: 92, target: 95 },
    { label: "Member Satisfaction", value: 4.6, target: 4.8, max: 5 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Schedule Optimizer</h1>
          <p className="text-muted-foreground">Quantum scheduling with predictive intelligence</p>
        </div>
        <Button
          size="lg"
          onClick={() => {
            setIsOptimizing(true)
            setTimeout(() => setIsOptimizing(false), 3000)
          }}
          disabled={isOptimizing}
        >
          <Zap className="mr-2 h-4 w-4" />
          {isOptimizing ? "Optimizing..." : "Run AI Optimization"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {optimizationMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle className="text-3xl">
                {metric.max ? `${metric.value}/${metric.max}` : `${metric.value}%`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={metric.max ? (metric.value / metric.max) * 100 : metric.value} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Target: {metric.max ? `${metric.target}/${metric.max}` : `${metric.target}%`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Recommendations</CardTitle>
          <CardDescription>Next 3 months predictive insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => {
              const Icon = prediction.icon
              return (
                <div key={prediction.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-lg bg-muted ${prediction.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{prediction.type}</h4>
                        <p className="text-sm text-muted-foreground">{prediction.timeSlot}</p>
                      </div>
                      <Badge variant="secondary">{prediction.confidence}% confidence</Badge>
                    </div>
                    <p className="text-sm">{prediction.suggestion}</p>
                    <p className="text-sm font-medium text-green-600">{prediction.impact}</p>
                    <div className="flex gap-2">
                      <Button size="sm">Apply Suggestion</Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
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
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Seasonal Flow Adjustments
          </CardTitle>
          <CardDescription>Automated schedule adaptation based on seasons and weather patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {seasonalAdjustments.map((seasonal) => (
              <div key={seasonal.season} className="space-y-3">
                <h4 className="font-semibold text-lg">{seasonal.season} Strategy</h4>
                <ul className="space-y-2">
                  {seasonal.adjustments.map((adjustment, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>{adjustment}</span>
                    </li>
                  ))}
                </ul>
                <Badge variant="outline" className="mt-2">
                  Expected Impact: {seasonal.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Weather-Adaptive Scheduling
          </CardTitle>
          <CardDescription>Real-time adjustments based on weather forecasts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">Hot Yoga Adjustment</h5>
                <p className="text-sm text-muted-foreground">
                  Automatically reduces room temperature when external temp exceeds 85°F
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">Outdoor Class Management</h5>
                <p className="text-sm text-muted-foreground">
                  Moves outdoor classes indoor if rain probability exceeds 40%
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">Energy-Based Scheduling</h5>
                <p className="text-sm text-muted-foreground">
                  Maps energizing classes to mornings, restorative to evenings
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Daily Energy Flow Optimization
          </CardTitle>
          <CardDescription>Intelligent class intensity mapping throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "6:00 AM - 9:00 AM", type: "Energizing", classes: ["Power Vinyasa", "Hot Yoga", "Ashtanga"] },
              { time: "9:00 AM - 12:00 PM", type: "Moderate", classes: ["Vinyasa Flow", "Hatha", "Beginner Yoga"] },
              { time: "12:00 PM - 3:00 PM", type: "Balanced", classes: ["Lunch Flow", "Yin Yang", "Gentle Yoga"] },
              { time: "5:00 PM - 7:00 PM", type: "Dynamic", classes: ["Power Hour", "Core Flow", "Athletic Yoga"] },
              { time: "7:00 PM - 9:00 PM", type: "Restorative", classes: ["Yin Yoga", "Restorative", "Meditation"] },
            ].map((slot, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-32 text-sm font-medium">{slot.time}</div>
                <Badge>{slot.type}</Badge>
                <div className="flex-1 flex flex-wrap gap-2">
                  {slot.classes.map((cls) => (
                    <Badge key={cls} variant="outline">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
