"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Calendar, Smile, Meh, Frown } from "lucide-react"

export default function JournalPage() {
  const [entries] = useState([
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
    {
      id: 3,
      date: "2024-01-12",
      class: "Power Yoga",
      mood: "tired",
      energy: "low",
      notes: "Tough class but pushed through. Body was sore from yesterday.",
      highlights: ["Built endurance", "Completed full class"],
    },
  ])

  const [showNewEntry, setShowNewEntry] = useState(false)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Practice Journal</h1>
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
        {entries.map((entry) => (
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
                  {entry.mood === "tired" && <Frown className="h-5 w-5 text-orange-500" />}
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
    </div>
  )
}
