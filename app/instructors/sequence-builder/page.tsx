import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Clock, Wand2, Save } from "lucide-react"

export default function SequenceBuilderPage() {
  const sequenceSteps = [
    { time: "0-5 min", pose: "Child's Pose & Breath Awareness", category: "Opening", cues: "3 breaths, set intention" },
    { time: "5-10 min", pose: "Cat-Cow Flow", category: "Warm-up", cues: "8 rounds, synchronize with breath" },
    { time: "10-15 min", pose: "Sun Salutation A", category: "Warm-up", cues: "3 rounds, build heat" },
    { time: "15-25 min", pose: "Warrior II Flow", category: "Standing", cues: "Hold 5 breaths each side" },
    { time: "25-35 min", pose: "Triangle to Half Moon", category: "Standing", cues: "Transition smoothly" },
    { time: "35-40 min", pose: "Pigeon Pose", category: "Hip Opening", cues: "2 minutes each side" },
    { time: "40-45 min", pose: "Seated Forward Fold", category: "Cooldown", cues: "Hold 8 breaths" },
    { time: "45-50 min", pose: "Supine Twist", category: "Cooldown", cues: "1 minute each side" },
    { time: "50-60 min", pose: "Savasana", category: "Rest", cues: "Complete relaxation" },
  ]

  const aiSuggestions = [
    { type: "Addition", suggestion: "Add shoulder opener before Triangle", reason: "Students often tight here" },
    { type: "Modification", suggestion: "Offer chair option for standing poses", reason: "3 beginners in class" },
    { type: "Timing", suggestion: "Reduce Warrior flow by 2 min", reason: "Running long based on history" },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Sequence Builder</h1>
          <p className="text-muted-foreground">Create intelligent class sequences with AI assistance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button>
            <Wand2 className="h-4 w-4 mr-2" />
            Generate with AI
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Class Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium">Class Name</label>
              <Input placeholder="Morning Flow" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Duration</label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="75">75 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Level</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="all">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Focus Area</label>
              <Select defaultValue="balance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength Building</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="balance">Balance</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                  <SelectItem value="core">Core Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>Recommendations based on your teaching style and student feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiSuggestions.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {item.type}
                          </Badge>
                          <span className="font-medium">{item.suggestion}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.reason}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sequence Timeline</CardTitle>
              <CardDescription>Drag to reorder, click to edit</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Pose
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sequenceSteps.map((step, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{step.time}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.pose}</div>
                        <div className="text-sm text-muted-foreground">{step.cues}</div>
                      </div>
                      <Badge variant="outline">{step.category}</Badge>
                    </div>
                    <Button size="sm" variant="ghost">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
