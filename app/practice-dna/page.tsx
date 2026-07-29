"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, TrendingUp, AlertTriangle, Brain, Smile, Moon, Apple, Dumbbell, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PracticeDNAPage() {
  const [selectedBiometric, setSelectedBiometric] = useState("heart-rate")

  const practiceProfile = {
    signature: "Energetic Flow Seeker",
    dominantStyle: "Vinyasa Flow",
    practiceAge: "2 years 4 months",
    totalClasses: 184,
    favoriteTime: "Evening (6-8 PM)",
    avgHeartRate: 118,
    recoveryScore: 87,
  }

  const biometricData = {
    heartRate: {
      current: 72,
      avg: 118,
      trend: "stable",
      zones: [
        { zone: "Warm-up", percentage: 15, color: "bg-blue-500" },
        { zone: "Flow", percentage: 60, color: "bg-green-500" },
        { zone: "Peak", percentage: 20, color: "bg-orange-500" },
        { zone: "Cool-down", percentage: 5, color: "bg-purple-500" },
      ],
    },
    sleep: {
      lastNight: "7h 32m",
      quality: 82,
      recommendation: "Great sleep! Perfect for morning power class",
    },
    stress: {
      level: "Low",
      score: 28,
      recommendation: "Maintain with restorative practices 2x/week",
    },
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
    {
      area: "Hamstrings",
      risk: "Low",
      level: 20,
      reason: "Proper progression in flexibility",
      recommendation: "Gradual deepening appropriate, keep warming up properly",
      icon: Shield,
      color: "text-green-600",
    },
  ]

  const moodRecommendations = [
    {
      mood: "Energized",
      classes: ["Power Vinyasa", "Hot Yoga", "Athletic Flow"],
      description: "Channel your energy into dynamic practice",
      color: "bg-orange-100 text-orange-900 border-orange-200",
      icon: Smile,
    },
    {
      mood: "Stressed",
      classes: ["Restorative Yoga", "Yin Yoga", "Meditation"],
      description: "Calm your nervous system with gentle practice",
      color: "bg-blue-100 text-blue-900 border-blue-200",
      icon: Brain,
    },
    {
      mood: "Tired",
      classes: ["Gentle Flow", "Yoga Nidra", "Breathwork"],
      description: "Restore energy with nourishing practice",
      color: "bg-purple-100 text-purple-900 border-purple-200",
      icon: Moon,
    },
  ]

  const adaptivePath = [
    {
      phase: "Current Phase",
      focus: "Building Strength & Flexibility",
      duration: "Weeks 1-4",
      classes: ["Power Vinyasa (2x/week)", "Yin Yoga (1x/week)", "Core Flow (1x/week)"],
      status: "in-progress",
    },
    {
      phase: "Next Phase",
      focus: "Advancing Inversions",
      duration: "Weeks 5-8",
      classes: ["Advanced Vinyasa (2x/week)", "Inversion Workshop", "Arm Balance Practice"],
      status: "upcoming",
    },
    {
      phase: "Future Goal",
      focus: "Advanced Arm Balances",
      duration: "Weeks 9-12",
      classes: ["Master Class Series", "One-on-One Training"],
      status: "planned",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Practice DNA</h1>
          <p className="text-muted-foreground">Unique signature of your yoga journey with AI-powered insights</p>
        </div>
        <Button size="lg">
          <Activity className="mr-2 h-4 w-4" />
          Sync Wearable
        </Button>
      </div>

      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{practiceProfile.signature}</CardTitle>
              <CardDescription>
                Your unique practice identity based on {practiceProfile.totalClasses} classes
              </CardDescription>
            </div>
            <Badge className="text-lg px-4 py-2">DNA Match: 98%</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Dominant Style</p>
              <p className="text-lg font-semibold">{practiceProfile.dominantStyle}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Practice Age</p>
              <p className="text-lg font-semibold">{practiceProfile.practiceAge}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Favorite Time</p>
              <p className="text-lg font-semibold">{practiceProfile.favoriteTime}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Recovery Score</p>
              <p className="text-lg font-semibold text-green-600">{practiceProfile.recoveryScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <div className="space-y-2">
              <p className="text-sm font-medium">Time in Zones</p>
              {biometricData.heartRate.zones.map((zone) => (
                <div key={zone.zone} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{zone.zone}</span>
                    <span>{zone.percentage}%</span>
                  </div>
                  <Progress value={zone.percentage} className="h-2" />
                </div>
              ))}
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
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-900">{biometricData.sleep.recommendation}</p>
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
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">{biometricData.stress.recommendation}</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="h-5 w-5" />
            Mood-Based Practice Matching
          </CardTitle>
          <CardDescription>What should you practice today based on your emotional state?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {moodRecommendations.map((rec) => {
              const Icon = rec.icon
              return (
                <div key={rec.mood} className={`p-4 border rounded-lg ${rec.color}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-5 w-5" />
                    <h4 className="font-semibold">{rec.mood}</h4>
                  </div>
                  <p className="text-sm mb-3">{rec.description}</p>
                  <div className="space-y-1">
                    {rec.classes.map((cls) => (
                      <Badge key={cls} variant="outline" className="mr-2">
                        {cls}
                      </Badge>
                    ))}
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
            <TrendingUp className="h-5 w-5" />
            Adaptive Learning Path
          </CardTitle>
          <CardDescription>Personalized progression based on your goals and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adaptivePath.map((phase, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${phase.status === "in-progress" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {idx + 1}
                  </div>
                  {idx < adaptivePath.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{phase.phase}</h4>
                    <Badge variant={phase.status === "in-progress" ? "default" : "secondary"}>
                      {phase.status === "in-progress" ? "Current" : phase.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {phase.focus} • {phase.duration}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.classes.map((cls) => (
                      <Badge key={cls} variant="outline">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
            <CardDescription>Optimize eating patterns with practice</CardDescription>
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
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-900">Your practice burns ~250 cal/hour on average</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Cross-Training Integration
            </CardTitle>
            <CardDescription>Complementary activities for balanced fitness</CardDescription>
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
            <div className="p-3 border rounded-lg">
              <h5 className="font-semibold text-sm mb-1">Rest Days</h5>
              <p className="text-sm text-muted-foreground">2-3 days/week for optimal recovery</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
