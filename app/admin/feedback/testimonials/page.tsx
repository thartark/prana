"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, Eye, CheckCircle, X } from "lucide-react"

export default function TestimonialsPage() {
  const [testimonials] = useState([
    {
      id: 1,
      member: "Sarah Johnson",
      avatar: "/placeholder.svg?key=sarah",
      rating: 5,
      text: "This studio has completely transformed my practice. The instructors are knowledgeable, the community is welcoming, and I've seen amazing progress in just 3 months!",
      date: "2024-01-15",
      status: "approved",
      featured: true,
      likes: 24,
      views: 156,
    },
    {
      id: 2,
      member: "Michael Chen",
      avatar: "/placeholder.svg?key=michael",
      rating: 5,
      text: "Best yoga studio in the city! The variety of classes and flexible scheduling make it easy to maintain a consistent practice.",
      date: "2024-01-12",
      status: "approved",
      featured: false,
      likes: 18,
      views: 98,
    },
    {
      id: 3,
      member: "Emma Williams",
      avatar: "/placeholder.svg?key=emma",
      rating: 5,
      text: "I was nervous as a beginner, but the instructors made me feel so comfortable. Now yoga is a regular part of my life!",
      date: "2024-01-10",
      status: "pending",
      featured: false,
      likes: 0,
      views: 0,
    },
    {
      id: 4,
      member: "David Kumar",
      avatar: "/placeholder.svg?key=david",
      rating: 4,
      text: "Great classes and instructors. The online platform makes it easy to book and the virtual classes are a nice option.",
      date: "2024-01-08",
      status: "approved",
      featured: false,
      likes: 12,
      views: 67,
    },
  ])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage and feature member testimonials</p>
        </div>
        <Button>Request Testimonials</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">On website</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.member} />
                  <AvatarFallback>
                    {testimonial.member
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{testimonial.member}</h3>
                        <Badge
                          variant={
                            testimonial.status === "approved"
                              ? "default"
                              : testimonial.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {testimonial.status}
                        </Badge>
                        {testimonial.featured && <Badge variant="destructive">Featured</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {testimonial.status === "pending" && (
                        <>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {testimonial.status === "approved" && (
                        <Button size="sm" variant="outline">
                          {testimonial.featured ? "Unfeature" : "Feature"}
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm mb-3">{testimonial.text}</p>

                  {testimonial.status === "approved" && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {testimonial.likes} likes
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {testimonial.views} views
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
