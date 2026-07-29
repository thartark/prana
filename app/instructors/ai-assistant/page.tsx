import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Users, Clock, BookOpen, Brain } from "lucide-react"

export default function AIAssistantPage() {
  const suggestions = [
    {
      type: "sequence",
      title: "Hip-Opening Flow for Evening",
      reason: "Based on your students' feedback requesting more hip work",
      confidence: 92,
      icon: BookOpen,
    },
    {
      type: "timing",
      title: "Adjust Savasana Duration",
      reason: "Students report feeling rushed. Add 3 minutes",
      confidence: 87,
      icon: Clock,
    },
    {
      type: "energy",
      title: "Start with Energizing Breath",
      reason: "Morning class energy typically low first 10 mins",
      confidence: 94,
      icon: Sparkles,
    },
    {
      type: "student",
      title: "Check on Sarah's Lower Back",
      reason: "Flagged discomfort in forward folds last 2 classes",
      confidence: 89,
      icon: Users,
    },
  ]

  const recentQueries = [
    { query: "Modifications for shoulder injury", response: "Avoid chaturanga, use wall push-ups instead..." },
    { query: "Energizing sequence for 6am class", response: "Start with sun salutations, include warrior flows..." },
    { query: "Calming alternatives to inversions", response: "Legs up the wall, supported bridge, gentle twists..." },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Teaching Assistant</h1>
        <p className="text-muted-foreground">Your intelligent co-teacher powered by student data and yoga science</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ask Your AI Co-Teacher</CardTitle>
            <CardDescription>Get personalized teaching insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Ask anything... e.g., 'What modifications should I offer for beginners in tomorrow's power flow?'"
                className="min-h-[100px]"
              />
              <Button className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Get AI Insights
              </Button>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Recent Queries</h3>
                {recentQueries.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{item.query}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.response}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teaching Stats</CardTitle>
            <CardDescription>Your impact this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">Students taught</p>
            </div>
            <div>
              <div className="text-2xl font-bold">4.9</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">Recommendation rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Suggestions</CardTitle>
          <CardDescription>
            Personalized recommendations based on your teaching patterns and student feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">{suggestion.title}</CardTitle>
                      </div>
                      <Badge variant="secondary">{suggestion.confidence}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{suggestion.reason}</p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      Apply Suggestion
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
