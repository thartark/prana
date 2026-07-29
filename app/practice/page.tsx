"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Target,
  Calendar,
  CheckCircle2,
  Plus,
  Smile,
  Meh,
  Frown,
  Heart,
  Moon,
  Brain,
  AlertTriangle,
  Shield,
  Activity,
  Apple,
  Dumbbell,
} from "lucide-react"

export default function MyPracticeHubPage() {
  const [showNewEntry, setShowNewEntry] = useState(false)

  const goals = [
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
  ]

  const journalEntries = [
    {
      id: 1,
      date: "2024-01-15",
      class: "Vinyasa Flow",
      mood: "happy",
      energy: "high",
      notes: "Great class! Finally held crow pose for 30 seconds. Feeling strong and energized.",
      highlights: ["Crow pose progress", "Better breathing control"],
    },
    {
      id: 2,
      date: "2024-01-14",
      class: "Yin Yoga",
      mood: "calm",
      energy: "medium",
      notes: "Needed this slower pace today. Hip openers were challenging but beneficial.",
      highlights: ["Deep stretching", "Mental clarity"],
    },
  ]

  const biometricData = {
    heartRate: { current: 72, avg: 118 },
    sleep: { lastNight: "7h 32m", quality: 82 },
    stress: { level: "Low", score: 28 },
  }

  const injuryRisks = [
    {
      area: "Lower Back",
      risk: "Moderate",
      level: 45,
      reason: "Repeated forward folds detected",
      recommendation: "Focus on core strengthening, limit deep forward bends",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      area: "Right Shoulder",
      risk: "Low",
      level: 25,
      reason: "Good alignment in Chaturanga",
      recommendation: "Continue current practice, maintain shoulder mobility",
      icon: Shield,
      color: "text-green-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Practice Hub</h1>
          <p className="text-muted-foreground">Track goals, journal reflections, and optimize your practice</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="dna">Practice DNA</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goals.filter((g) => g.status === "in-progress").length}</div>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{journalEntries.length}</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Recovery Score</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <p className="text-xs text-muted-foreground">Ready to practice</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Health Snapshot</CardTitle>
                <CardDescription>Your current wellness indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{biometricData.heartRate.current}</p>
                    <p className="text-sm text-muted-foreground">Resting BPM</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Moon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{biometricData.sleep.lastNight}</p>
                    <p className="text-sm text-muted-foreground">Sleep last night</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Brain className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{biometricData.stress.level}</p>
                    <p className="text-sm text-muted-foreground">Stress level</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Goals Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {goals.slice(0, 2).map((goal) => (
                  <div key={goal.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{goal.title}</h4>
                      <Badge variant="secondary">{goal.category}</Badge>
                    </div>
                    <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {goal.progress} / {goal.target}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Goals</h2>
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
          </TabsContent>

          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Practice Journal</h2>
                <p className="text-muted-foreground">Reflect on your practice and track your journey</p>
              </div>
              <Button onClick={() => setShowNewEntry(!showNewEntry)}>
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </div>

            {showNewEntry && (
              <Card>
                <CardHeader>
                  <CardTitle>New Journal Entry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>How do you feel?</Label>
                    <RadioGroup defaultValue="happy" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="happy" id="happy" />
                        <Label htmlFor="happy" className="flex items-center gap-2 cursor-pointer">
                          <Smile className="h-5 w-5 text-green-500" />
                          Happy
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="neutral" />
                        <Label htmlFor="neutral" className="flex items-center gap-2 cursor-pointer">
                          <Meh className="h-5 w-5 text-yellow-500" />
                          Neutral
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tired" id="tired" />
                        <Label htmlFor="tired" className="flex items-center gap-2 cursor-pointer">
                          <Frown className="h-5 w-5 text-orange-500" />
                          Tired
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Energy Level</Label>
                    <RadioGroup defaultValue="medium" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Practice Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="How was your practice today? Any breakthroughs or challenges?"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button>Save Entry</Button>
                    <Button variant="outline" onClick={() => setShowNewEntry(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline">{entry.class}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {entry.mood === "happy" && <Smile className="h-5 w-5 text-green-500" />}
                        {entry.mood === "calm" && <Meh className="h-5 w-5 text-blue-500" />}
                        <Badge variant="secondary">{entry.energy} energy</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{entry.notes}</p>
                    {entry.highlights.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Highlights:</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.highlights.map((highlight, i) => (
                            <Badge key={i} variant="secondary">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Practice DNA Tab */}
          <TabsContent value="dna" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Practice DNA</h2>
                <p className="text-muted-foreground">AI-powered insights and biometric tracking</p>
              </div>
              <Button>
                <Activity className="mr-2 h-4 w-4" />
                Sync Wearable
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Heart Rate
                  </CardTitle>
                  <CardDescription>During practice & recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold">{biometricData.heartRate.current}</p>
                    <p className="text-sm text-muted-foreground">Resting BPM</p>
                    <Badge variant="secondary" className="mt-2">
                      Avg practice: {biometricData.heartRate.avg} BPM
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-blue-500" />
                    Sleep Quality
                  </CardTitle>
                  <CardDescription>Impact on practice readiness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold">{biometricData.sleep.lastNight}</p>
                    <p className="text-sm text-muted-foreground">Last night</p>
                    <div className="mt-2">
                      <Progress value={biometricData.sleep.quality} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Quality: {biometricData.sleep.quality}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    Stress Level
                  </CardTitle>
                  <CardDescription>Nervous system balance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold">{biometricData.stress.level}</p>
                    <p className="text-sm text-muted-foreground">Current state</p>
                    <div className="mt-2">
                      <Progress value={biometricData.stress.score} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Score: {biometricData.stress.score}/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Injury Prevention Engine
                </CardTitle>
                <CardDescription>AI-powered risk assessment and personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {injuryRisks.map((risk) => {
                    const Icon = risk.icon
                    return (
                      <div key={risk.area} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-muted ${risk.color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{risk.area}</h4>
                              <p className="text-sm text-muted-foreground">{risk.reason}</p>
                            </div>
                          </div>
                          <Badge variant={risk.risk === "Moderate" ? "secondary" : "outline"}>{risk.risk} Risk</Badge>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Risk Level</span>
                            <span>{risk.level}%</span>
                          </div>
                          <Progress value={risk.level} className="h-2" />
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-900">
                            <strong>Recommendation:</strong> {risk.recommendation}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5" />
                    Nutrition-Yoga Synergy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-semibold text-sm mb-1">Before Practice</h5>
                    <p className="text-sm text-muted-foreground">Light snack 90 mins before • Stay hydrated</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-semibold text-sm mb-1">After Practice</h5>
                    <p className="text-sm text-muted-foreground">Protein + carbs within 60 mins • Recovery smoothie</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" />
                    Cross-Training Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-semibold text-sm mb-1">Recommended Activities</h5>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge>Swimming</Badge>
                      <Badge>Pilates</Badge>
                      <Badge>Light Cardio</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
