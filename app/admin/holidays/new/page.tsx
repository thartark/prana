"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewHolidayPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFullDay, setIsFullDay] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push("/admin/holidays")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/holidays">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Holiday</h1>
          <p className="text-muted-foreground">Schedule a studio closure or special hours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Holiday Details</CardTitle>
            <CardDescription>Enter the closure information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Holiday Name</Label>
              <Input id="name" placeholder="e.g., Christmas Day" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Full Day Closure</Label>
                <p className="text-sm text-muted-foreground">
                  Studio will be closed all day
                </p>
              </div>
              <Switch checked={isFullDay} onCheckedChange={setIsFullDay} />
            </div>

            {!isFullDay && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openTime">Open Time</Label>
                  <Input id="openTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closeTime">Close Time</Label>
                  <Input id="closeTime" type="time" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea 
                id="notes" 
                placeholder="Any additional information for staff or members..."
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="notifyMembers" defaultChecked />
              <Label htmlFor="notifyMembers" className="font-normal">
                Send notification to members about this closure
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/holidays">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Holiday"}
          </Button>
        </div>
      </form>
    </div>
  )
}
