"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Star, Calendar, Award, Heart } from "lucide-react"
import { mockDataManager } from "@/lib/mock-data"

function InstructorsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  
  const instructors = mockDataManager.getInstructors()
  
  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(instructors.flatMap((i) => i.specialties || []))
  ).sort()
  
  // Filter instructors
  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = 
      instructor.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.bio?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = 
      selectedSpecialty === "all" || 
      instructor.specialties?.includes(selectedSpecialty)
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Our Instructors</h1>
        <p className="text-lg text-muted-foreground">
          Meet our talented team of certified wellness professionals dedicated to guiding your practice
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {allSpecialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Instructors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInstructors.map((instructor) => (
          <Card key={instructor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-muted flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center text-3xl font-bold text-primary">
                {instructor.full_name?.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{instructor.full_name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{instructor.title || "Certified Instructor"}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{instructor.rating || "4.9"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {instructor.bio || "Passionate about helping students discover their inner strength through mindful movement."}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {(instructor.specialties || ["Yoga"]).slice(0, 3).map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{instructor.years_experience || 5}+ years</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>{instructor.certifications?.length || 3} certifications</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/instructors/${instructor.id}`}>View Profile</Link>
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredInstructors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No instructors found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedSpecialty("all"); }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default function InstructorsPage() {
  return (
    <Suspense fallback={null}>
      <InstructorsContent />
    </Suspense>
  )
}
