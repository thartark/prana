"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Star, Users, DollarSign, Calendar, Award, Target, MessageCircle } from "lucide-react"

export default function StaffPerformancePage() {
  const instructors = [
    {
      id: "1",
      name: "Sarah Martinez",
      role: "Senior Instructor",
      rating: 4.9,
      classes: 48,
      attendance: 860,
      revenue: 12400,
      commission: 1860,
      reviews: 127,
      growthRate: 12,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Instructor",
      rating: 4.7,
      classes: 32,
      attendance: 580,
      revenue: 8900,
      commission: 1335,
      reviews: 89,
      growthRate: 8,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Lead Instructor",
      rating: 4.8,
      classes: 42,
      attendance: 750,
      revenue: 11200,
      commission: 1680,
      reviews: 103,
      growthRate: 15,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Staff Performance</h1>
        <p className="text-muted-foreground">Track instructor metrics and performance</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Classes</p>
                <p className="text-2xl font-bold">122</p>
                <p className="text-xs text-green-600 mt-1">+18% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-green-600 mt-1">+0.2 vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Attendance</p>
                <p className="text-2xl font-bold">2,190</p>
                <p className="text-xs text-green-600 mt-1">+24% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Commission</p>
                <p className="text-2xl font-bold">$4,875</p>
                <p className="text-xs text-green-600 mt-1">+16% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructor Performance Cards */}
      <div className="space-y-4 mb-6">
        {instructors.map((instructor) => (
          <Card key={instructor.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <CardTitle>{instructor.name}</CardTitle>
                    <CardDescription>{instructor.role}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                    {instructor.rating}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Classes Taught</p>
                  </div>
                  <p className="text-2xl font-bold">{instructor.classes}</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Total Attendance</p>
                  </div>
                  <p className="text-2xl font-bold">{instructor.attendance}</p>
                  <p className="text-xs text-muted-foreground mt-1">Students</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Revenue Generated</p>
                  </div>
                  <p className="text-2xl font-bold">${instructor.revenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+{instructor.growthRate}% growth</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Commission Earned</p>
                  </div>
                  <p className="text-2xl font-bold">${instructor.commission.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">15% rate</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Client Reviews</p>
                  </div>
                  <p className="text-2xl font-bold">{instructor.reviews}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total reviews</p>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Class Fill Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((instructor.attendance / (instructor.classes * 20)) * 100)}%
                    </span>
                  </div>
                  <Progress value={(instructor.attendance / (instructor.classes * 20)) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Client Satisfaction</span>
                    <span className="text-sm text-muted-foreground">{instructor.rating}/5.0</span>
                  </div>
                  <Progress value={(instructor.rating / 5) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Goals & Targets</CardTitle>
          <CardDescription>Studio-wide objectives for this quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Average Class Size</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Target</span>
                  <span className="font-semibold">20 students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <span className="font-semibold text-green-600">18 students</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Instructor Rating</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Target</span>
                  <span className="font-semibold">4.7+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <span className="font-semibold text-green-600">4.8</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Growth Rate</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Target</span>
                  <span className="font-semibold">10% MoM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current</span>
                  <span className="font-semibold text-green-600">15% MoM</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
