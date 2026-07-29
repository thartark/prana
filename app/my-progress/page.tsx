import { Progress } from "@/components/ui/progress"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
export default function MyProgressPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Progress</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Classes This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">+6 from last month</p>
            <Progress value={80} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12 days</div>
            <p className="text-sm text-muted-foreground">Personal best: 18 days</p>
            <Progress value={66} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minutes Practiced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1,440</div>
            <p className="text-sm text-muted-foreground">24 hours total</p>
            <Progress value={90} className="mt-4" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart showing classes attended over time
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Flexibility</span>
              <span className="text-sm text-muted-foreground">Advanced</span>
            </div>
            <Progress value={85} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Balance</span>
              <span className="text-sm text-muted-foreground">Intermediate</span>
            </div>
            <Progress value={65} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Strength</span>
              <span className="text-sm text-muted-foreground">Intermediate</span>
            </div>
            <Progress value={70} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Breathing</span>
              <span className="text-sm text-muted-foreground">Advanced</span>
            </div>
            <Progress value={80} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
