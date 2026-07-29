"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { 
  ArrowLeft, Star, Calendar, Award, Clock, Users, MapPin, 
  Heart, Share2, Mail, Instagram, Facebook 
} from "lucide-react"
import { mockDataManager } from "@/lib/mock-data"

export default function InstructorDetailPage() {
  const params = useParams()
  const instructorId = params.id as string
  
  const instructors = mockDataManager.getInstructors()
  const instructor = instructors.find((i) => i.id === instructorId) || instructors[0]
  
  // Get classes taught by this instructor
  const allClasses = mockDataManager.getClasses()
  const instructorClasses = allClasses.filter(
    (c) => c.instructor_id === instructorId || c.instructor_name === instructor.full_name
  )
  
  // Mock upcoming classes
  const upcomingClasses = instructorClasses.length > 0 ? instructorClasses : [
    {
      id: "1",
      name: "Morning Vinyasa Flow",
      time: "7:00 AM",
      day: "Mon, Wed, Fri",
      duration: "60 min",
      level: "All Levels",
      spots_left: 5,
    },
    {
      id: "2",
      name: "Power Yoga",
      time: "12:00 PM",
      day: "Tue, Thu",
      duration: "75 min",
      level: "Intermediate",
      spots_left: 3,
    },
    {
      id: "3",
      name: "Restorative Sunday",
      time: "4:00 PM",
      day: "Sunday",
      duration: "90 min",
      level: "All Levels",
      spots_left: 8,
    },
  ]
  
  // Mock reviews
  const reviews = [
    {
      id: "1",
      user: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely wonderful instructor! The class was challenging but accessible, and the adjustments were so helpful.",
    },
    {
      id: "2",
      user: "Michael T.",
      rating: 5,
      date: "1 month ago",
      comment: "Best yoga class I've ever taken. The energy and guidance are unmatched.",
    },
    {
      id: "3",
      user: "Emma R.",
      rating: 4,
      date: "1 month ago",
      comment: "Great class structure and pacing. Would definitely recommend!",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/instructors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Instructors
        </Link>
      </Button>
      
      {/* Header */}
      <div className="grid gap-8 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-4xl font-bold text-primary mb-4">
                  {instructor.full_name?.split(" ").map((n) => n[0]).join("")}
                </div>
                <h1 className="text-2xl font-bold mb-1">{instructor.full_name}</h1>
                <p className="text-muted-foreground mb-4">{instructor.title || "Senior Yoga Instructor"}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="font-bold">{instructor.rating || "4.9"}</span>
                  </div>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
                
                <div className="flex gap-2 justify-center mb-4">
                  <Button size="icon" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <Button size="icon" variant="ghost">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Facebook className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Stats */}
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{instructor.years_experience || 8}+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{instructor.classes_taught || 2500}+</div>
                  <div className="text-sm text-muted-foreground">Classes Taught</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{instructor.students_taught || 850}+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{instructor.certifications?.length || 5}</div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {instructor.full_name?.split(" ")[0]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {instructor.bio || `${instructor.full_name} is a dedicated wellness professional with a passion for helping students discover their inner strength through mindful movement. With years of experience and continuous learning, they create a welcoming and challenging environment for practitioners of all levels.`}
                  </p>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {(instructor.specialties || ["Vinyasa", "Power Yoga", "Restorative", "Meditation"]).map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <ul className="space-y-2">
                      {(instructor.certifications || [
                        "500-Hour RYT (Yoga Alliance)",
                        "Prenatal Yoga Certification",
                        "Trauma-Informed Yoga Training",
                        "Meditation Teacher Certification",
                      ]).map((cert, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="h-4 w-4 text-primary" />
                          {typeof cert === "string" ? cert : cert.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Teaching Philosophy</h3>
                    <p className="text-muted-foreground italic">
                      {instructor.teaching_philosophy || "\"I believe yoga is for every body. My goal is to create a safe, inclusive space where students can explore their practice, challenge themselves, and find moments of peace in their busy lives.\""}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingClasses.map((cls) => (
                      <div 
                        key={cls.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{cls.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {cls.day}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {cls.time} ({cls.duration})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{cls.level}</Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {cls.spots_left} spots left
                            </span>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/classes/${cls.id}/book`}>Book Now</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-medium">
                              {review.user.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
