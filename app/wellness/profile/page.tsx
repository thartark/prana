"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, Brain, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

export default function WellnessProfile() {
  const [activeTab, setActiveTab] = useState("overview")

  const healthMetrics = [
    { label: "Flexibility", value: 72, trend: "+8%", status: "improving" },
    { label: "Strength", value: 65, trend: "+5%", status: "improving" },
    { label: "Balance", value: 80, trend: "+12%", status: "improving" },
    { label: "Endurance", value: 58, trend: "+3%", status: "stable" },
  ]

  const goals = [
    { name: "Touch toes without bending knees", progress: 65, target: "In 4 weeks" },
    { name: "Hold plank for 2 minutes", progress: 80, target: "In 2 weeks" },
    { name: "Complete 10 sun salutations", progress: 100, target: "Achieved!" },
  ]

  const injuries = [
    {
      type: "Lower back sensitivity",
      date: "2 months ago",
      status: "recovering",
      modifications: ["Avoid deep forward folds", "Use props for support", "Focus on core strength"],
    },
    {
      type: "Right shoulder strain",
      date: "6 months ago",
      status: "healed",
      modifications: ["Cleared for all poses"],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wellness Profile</h1>
        <p className="text-muted-foreground">Track your health journey and progress</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="injuries">Injury Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Wellness</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <Progress value={78} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+6% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Physical Health</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <Progress value={82} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Excellent</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mental Wellness</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <Progress value={75} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Good</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Consistency</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2x</div>
                <p className="text-xs text-muted-foreground mt-2">per week average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Health Notes</CardTitle>
              <CardDescription>Important information for your instructors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {injuries.map((injury, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  {injury.status === "recovering" ? (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{injury.type}</p>
                      <Badge variant={injury.status === "recovering" ? "secondary" : "default"}>{injury.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{injury.date}</p>
                    <div className="space-y-1">
                      {injury.modifications.map((mod, idx) => (
                        <p key={idx} className="text-sm">
                          • {mod}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {healthMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.label}</CardTitle>
                    <Badge variant={metric.status === "improving" ? "default" : "secondary"}>{metric.trend}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Level</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} />
                    <p className="text-xs text-muted-foreground">
                      {metric.status === "improving" ? "Improving steadily" : "Maintaining current level"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Goals</CardTitle>
              <CardDescription>Track your progress towards your fitness objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{goal.name}</p>
                    <Badge variant={goal.progress === 100 ? "default" : "secondary"}>{goal.target}</Badge>
                  </div>
                  <Progress value={goal.progress} />
                  <p className="text-sm text-muted-foreground">{goal.progress}% complete</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="injuries" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Injury & Limitation Tracking</CardTitle>
                  <CardDescription>Document and manage your health considerations</CardDescription>
                </div>
                <Button>Add New</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {injuries.map((injury, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{injury.type}</h3>
                        <Badge variant={injury.status === "recovering" ? "secondary" : "default"}>
                          {injury.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{injury.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Recommended Modifications:</p>
                    <ul className="space-y-1">
                      {injury.modifications.map((mod, idx) => (
                        <li key={idx} className="text-sm">
                          • {mod}
                        </li>
                      ))}
                    </ul>
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
