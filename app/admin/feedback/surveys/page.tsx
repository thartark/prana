"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, TrendingUp, ThumbsUp, AlertCircle, Plus } from "lucide-react"

export default function SurveysPage() {
  const [surveys] = useState([
    {
      id: 1,
      title: "Post-Class Experience",
      type: "Post-Class",
      status: "Active",
      responses: 248,
      completionRate: 76,
      avgRating: 4.6,
      lastResponse: "2 hours ago",
    },
    {
      id: 2,
      title: "Net Promoter Score (NPS)",
      type: "NPS",
      status: "Active",
      responses: 142,
      completionRate: 68,
      avgRating: 8.4,
      lastResponse: "1 day ago",
    },
    {
      id: 3,
      title: "New Member Onboarding",
      type: "Onboarding",
      status: "Active",
      responses: 56,
      completionRate: 82,
      avgRating: 4.8,
      lastResponse: "3 hours ago",
    },
    {
      id: 4,
      title: "Membership Cancellation",
      type: "Exit Survey",
      status: "Active",
      responses: 12,
      completionRate: 45,
      avgRating: 3.2,
      lastResponse: "5 days ago",
    },
  ])

  const recentFeedback = [
    {
      id: 1,
      member: "Sarah M.",
      class: "Vinyasa Flow",
      rating: 5,
      comment: "Amazing class! Sarah's instruction was clear and the flow was perfect.",
      sentiment: "positive",
      date: "2 hours ago",
    },
    {
      id: 2,
      member: "Mike T.",
      class: "Power Yoga",
      rating: 4,
      comment: "Great workout but the room was a bit too warm for my liking.",
      sentiment: "neutral",
      date: "5 hours ago",
    },
    {
      id: 3,
      member: "Emma L.",
      class: "Beginner Hatha",
      rating: 3,
      comment: "The class was good but I felt it moved too quickly for beginners.",
      sentiment: "concern",
      date: "1 day ago",
    },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Surveys & Feedback</h1>
          <p className="text-muted-foreground">Collect and analyze member feedback</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Survey
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Total Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">458</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              NPS Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">72</div>
            <p className="text-xs text-muted-foreground">Excellent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">Low ratings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Surveys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {surveys.map((survey) => (
            <Card key={survey.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{survey.title}</h3>
                      <Badge variant="secondary">{survey.type}</Badge>
                      <Badge variant={survey.status === "Active" ? "default" : "outline"}>{survey.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Last response: {survey.lastResponse}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Results
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Responses</p>
                    <p className="text-2xl font-bold">{survey.responses}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Completion Rate</p>
                    <div className="flex items-center gap-2">
                      <Progress value={survey.completionRate} className="flex-1" />
                      <span className="font-medium">{survey.completionRate}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Average Rating</p>
                    <p className="text-2xl font-bold">{survey.avgRating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentFeedback.map((feedback) => (
            <Card key={feedback.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{feedback.member}</span>
                      <Badge variant="outline">{feedback.class}</Badge>
                      <Badge
                        variant={
                          feedback.sentiment === "positive"
                            ? "default"
                            : feedback.sentiment === "neutral"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {feedback.sentiment}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < feedback.rating ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm">{feedback.comment}</p>
                {feedback.sentiment === "concern" && (
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    Respond to Feedback
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
