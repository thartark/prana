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

export default function NewRetreatPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push("/admin/retreats")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/retreats">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Retreat</h1>
          <p className="text-muted-foreground">Set up a new yoga retreat experience</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the retreat details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Retreat Name</Label>
                <Input id="name" placeholder="e.g., Bali Yoga Retreat" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the retreat experience..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Ubud, Bali, Indonesia" required />
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
              <CardTitle>Pricing & Capacity</CardTitle>
              <CardDescription>Set pricing and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Person</Label>
                  <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="earlyBirdPrice">Early Bird Price</Label>
                  <Input id="earlyBirdPrice" type="number" placeholder="0.00" min="0" step="0.01" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Maximum Guests</Label>
                  <Input id="capacity" type="number" placeholder="20" min="1" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minGuests">Minimum Guests</Label>
                  <Input id="minGuests" type="number" placeholder="5" min="1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodationType">Accommodation Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shared">Shared Room</SelectItem>
                    <SelectItem value="private">Private Room</SelectItem>
                    <SelectItem value="villa">Private Villa</SelectItem>
                    <SelectItem value="glamping">Glamping</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Included Amenities</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked /> Meals
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked /> Airport Transfer
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked /> Daily Yoga
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> Spa Treatments
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/retreats">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Retreat"}
          </Button>
        </div>
      </form>
    </div>
  )
}
