"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, MessageCircle, Send } from "lucide-react"

export default function StaffReviewsPage() {
  const reviews = [
    {
      id: "1",
      instructor: "Sarah Martinez",
      student: "John Doe",
      rating: 5,
      comment: "Sarah's classes are amazing! Her energy is contagious and she really knows how to motivate.",
      date: "2025-01-20",
      classType: "Vinyasa Flow",
      responded: true,
    },
    {
      id: "2",
      instructor: "Michael Chen",
      student: "Jane Smith",
      rating: 5,
      comment: "Best instructor I've ever had. Very knowledgeable and patient with beginners.",
      date: "2025-01-19",
      classType: "Beginner Yoga",
      responded: false,
    },
    {
      id: "3",
      instructor: "Emily Rodriguez",
      student: "Bob Wilson",
      rating: 4,
      comment: "Great class but a bit too advanced for me. Would love more modifications offered.",
      date: "2025-01-18",
      classType: "Power Yoga",
      responded: true,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Staff Reviews</h1>
        <p className="text-muted-foreground">Client feedback and instructor ratings</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Reviews</p>
                <p className="text-2xl font-bold">487</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Rating</p>
                <p className="text-2xl font-bold">4.8</p>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
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
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-2xl font-bold">48</p>
                <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Response Rate</p>
                <p className="text-2xl font-bold">72%</p>
                <p className="text-xs text-muted-foreground mt-1">Reviews replied to</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Staff Reviews</CardTitle>
          <CardDescription>Latest client feedback for instructors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.instructor}</span>
                    <span className="text-muted-foreground">•</span>
                    <Badge variant="secondary" className="text-xs">
                      {review.classType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">by {review.student}</p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm">{review.comment}</p>

              {review.responded ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Response sent</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Textarea placeholder="Write a response to this review..." rows={2} />
                  <Button size="sm">
                    <Send className="h-3 w-3 mr-1" />
                    Send Response
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
