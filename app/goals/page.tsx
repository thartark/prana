"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Target, Calendar, CheckCircle2 } from "lucide-react"

export default function GoalsPage() {
  const [goals] = useState([
    {
      id: 1,
      title: "Attend 20 classes this month",
      progress: 15,
      target: 20,
      deadline: "2024-01-31",
      category: "Attendance",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Master handstand pose",
      progress: 60,
      target: 100,
      deadline: "2024-02-15",
      category: "Skill",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Complete 30-day challenge",
      progress: 30,
      target: 30,
      deadline: "2024-01-25",
      category: "Challenge",
      status: "completed",
    },
    {
      id: 4,
      title: "Improve flexibility score to 80%",
      progress: 72,
      target: 80,
      deadline: "2024-03-01",
      category: "Progress",
      status: "in-progress",
    },
  ])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Goals</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-48 text-center">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Set a new goal to track your progress</p>
            <Button variant="outline">Create Goal</Button>
          </CardContent>
        </Card>

        {goals.map((goal) => (
          <Card key={goal.id} className={goal.status === "completed" ? "border-green-500" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <Badge variant={goal.status === "completed" ? "default" : "secondary"}>{goal.category}</Badge>
                </div>
                {goal.status === "completed" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-medium">
                    {goal.progress} / {goal.target}
                  </span>
                </div>
                <Progress value={(goal.progress / goal.target) * 100} />
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>

              {goal.status === "in-progress" && (
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Update Progress
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
