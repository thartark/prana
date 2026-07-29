import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Target, TrendingUp } from "lucide-react"

export default function ChallengeLeavesPage() {
  const activeLeagues = [
    {
      id: 1,
      name: "30-Day Consistency Challenge",
      type: "Individual",
      participants: 124,
      duration: "15 days remaining",
      yourProgress: 73,
      yourRank: 12,
      prize: "Free Month Membership",
      goal: "Complete 20 classes in 30 days",
    },
    {
      id: 2,
      name: "Studio Team Competition",
      type: "Team",
      participants: 8,
      duration: "7 days remaining",
      yourProgress: 85,
      yourRank: 2,
      prize: "Team Retreat Weekend",
      goal: "Most combined classes as a team",
    },
    {
      id: 3,
      name: "Mindful Minutes Marathon",
      type: "Individual",
      participants: 89,
      duration: "22 days remaining",
      yourProgress: 45,
      yourRank: 34,
      prize: "Meditation Workshop Pass",
      goal: "Accumulate 500 meditation minutes",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Sarah Chen", points: 2450, badge: "gold" },
    { rank: 2, name: "Your Team", points: 2310, badge: "silver" },
    { rank: 3, name: "Mike Rodriguez", points: 2180, badge: "bronze" },
    { rank: 4, name: "Emma Wilson", points: 2050, badge: null },
    { rank: 5, name: "David Park", points: 1920, badge: null },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Challenge Leagues</h1>
        <p className="text-muted-foreground">Compete, collaborate, and achieve your goals together</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently participating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Challenges Won</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">All-time victories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">League Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,310</div>
            <p className="text-xs text-muted-foreground">Season total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Active Leagues</h2>
          <div className="space-y-4">
            {activeLeagues.map((league) => (
              <Card key={league.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{league.name}</CardTitle>
                      <CardDescription>{league.goal}</CardDescription>
                    </div>
                    <Badge variant="secondary">{league.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Your Progress</span>
                        <span className="text-sm text-muted-foreground">{league.yourProgress}%</span>
                      </div>
                      <Progress value={league.yourProgress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Rank</div>
                        <div className="font-semibold flex items-center gap-1">
                          <Medal className="h-4 w-4" />#{league.yourRank}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Duration</div>
                        <div className="font-semibold">{league.duration}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Prize</div>
                        <div className="font-semibold text-xs">{league.prize}</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Target className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>This season's rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                        {entry.badge === "gold" && <Trophy className="h-4 w-4 text-yellow-500" />}
                        {entry.badge === "silver" && <Medal className="h-4 w-4 text-gray-400" />}
                        {entry.badge === "bronze" && <Medal className="h-4 w-4 text-amber-600" />}
                        {!entry.badge && <span className="text-sm font-medium">{entry.rank}</span>}
                      </div>
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">{entry.points} pts</div>
                      </div>
                    </div>
                    {entry.name === "Your Team" && <Badge variant="secondary">You</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button className="w-full">
        <TrendingUp className="h-4 w-4 mr-2" />
        Browse All Challenges
      </Button>
    </div>
  )
}
