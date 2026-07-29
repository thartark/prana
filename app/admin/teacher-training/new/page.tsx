"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewTeacherTrainingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push("/admin/teacher-training")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/teacher-training">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Training Program</h1>
          <p className="text-muted-foreground">Set up a new yoga teacher training program</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
              <CardDescription>Enter the training program details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input id="name" placeholder="e.g., 200-Hour Yoga Teacher Training" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the training program curriculum..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="programType">Program Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="200hr">200-Hour YTT</SelectItem>
                    <SelectItem value="300hr">300-Hour YTT</SelectItem>
                    <SelectItem value="500hr">500-Hour YTT</SelectItem>
                    <SelectItem value="specialty">Specialty Certification</SelectItem>
                    <SelectItem value="continuing">Continuing Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Registration</CardTitle>
              <CardDescription>Set pricing and enrollment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Full Price</Label>
                  <Input id="price" type="number" placeholder="3500" min="0" step="0.01" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="earlyBirdPrice">Early Bird Price</Label>
                  <Input id="earlyBirdPrice" type="number" placeholder="3000" min="0" step="0.01" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="depositAmount">Deposit Amount</Label>
                  <Input id="depositAmount" type="number" placeholder="500" min="0" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxEnrollment">Maximum Enrollment</Label>
                  <Input id="maxEnrollment" type="number" placeholder="20" min="1" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Textarea 
                  id="prerequisites" 
                  placeholder="List any requirements for enrollment..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Certification Body</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yoga-alliance">Yoga Alliance</SelectItem>
                    <SelectItem value="yacep">YACEP</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/teacher-training">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Program"}
          </Button>
        </div>
      </form>
    </div>
  )
}
