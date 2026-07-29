"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Heart, MessageCircle, Send, Users, TrendingUp, Calendar, Medal, Target, Search } from "lucide-react"
import { useMockData } from "@/lib/use-mock-data"

function CommunityHubContent() {
  const { getMockData } = useMockData()
  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const data = getMockData()
    const communityPosts = (data.notifications || [])
      .filter((n: any) => n.type === "class" || n.type === "promotion")
      .slice(0, 10)
      .map((n: any) => ({
        id: n.id,
        content: n.message,
        author: "Yoga Studio",
        created_at: n.created_at,
        likes_count: (Number.parseInt(n.id.split("-")[1] || "5", 10) % 20) + 5,
        comments_count: (Number.parseInt(n.id.split("-")[1] || "1", 10) % 10) + 1,
      }))

    setPosts(communityPosts)
  }, [])

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return

    const newPostObj = {
      id: Date.now().toString(),
      content: newPost,
      author: "You",
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const tribes = [
    {
      id: 1,
      name: "Early Birds",
      description: "Morning practice enthusiasts who love sunrise flows",
      members: 48,
      category: "Time-based",
      activity: "Very Active",
      nextEvent: "Tomorrow, 6:00 AM",
    },
    {
      id: 2,
      name: "Power Flow Warriors",
      description: "Advanced practitioners pushing limits with challenging sequences",
      members: 32,
      category: "Style-based",
      activity: "Active",
      nextEvent: "Today, 7:00 PM",
    },
  ]

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
  ]

  const buddyMatches = [
    {
      id: 1,
      name: "Emma Johnson",
      level: "Intermediate",
      favoriteStyle: "Vinyasa",
      availability: "Mornings",
      matchScore: 95,
      commonClasses: 8,
    },
    {
      id: 2,
      name: "Michael Chen",
      level: "Beginner",
      favoriteStyle: "Hatha",
      availability: "Evenings",
      matchScore: 87,
      commonClasses: 5,
    },
  ]

  return (
    <Tabs defaultValue="feed" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="feed">Social Feed</TabsTrigger>
        <TabsTrigger value="tribes">Tribes</TabsTrigger>
        <TabsTrigger value="challenges">Challenges</TabsTrigger>
        <TabsTrigger value="buddies">Find Buddies</TabsTrigger>
      </TabsList>

      {/* Social Feed Tab */}
      <TabsContent value="feed" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">Active community</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Posts This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Trending up</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Your Posts</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.filter((p) => p.author === "You").length}</div>
              <p className="text-xs text-muted-foreground">Shared this month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmitPost}>
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your yoga journey, tips, or experiences..."
                className="mb-4"
                rows={3}
              />
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Share Post
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post: any) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                        {post.author[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold">{post.author}</h3>
                        <p className="text-sm text-muted-foreground">{formatTimeAgo(post.created_at)}</p>
                      </div>
                    </div>
                    {post.author === "You" && <Badge variant="secondary">Your Post</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes_count}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments_count}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      {/* Tribes Tab */}
      <TabsContent value="tribes" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Tribes</CardTitle>
              <CardDescription>Communities you're part of</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Active memberships</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Connections</CardTitle>
              <CardDescription>Practice partners across tribes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">34</div>
              <p className="text-sm text-muted-foreground">Fellow practitioners</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {tribes.map((tribe) => (
            <Card key={tribe.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{tribe.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{tribe.name}</CardTitle>
                      <CardDescription>{tribe.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{tribe.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{tribe.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{tribe.activity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{tribe.nextEvent}</span>
                  </div>
                </div>
                <Button className="w-full">Join Tribe</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Challenges Tab */}
      <TabsContent value="challenges" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
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
      </TabsContent>

      {/* Buddies Tab */}
      <TabsContent value="buddies" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Your Practice Buddies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Connected partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Classes Together</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">New Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Potential buddies</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, style, or availability..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {buddyMatches.map((buddy) => (
                <Card key={buddy.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg" alt={buddy.name} />
                        <AvatarFallback>
                          {buddy.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{buddy.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary">{buddy.level}</Badge>
                              <span>•</span>
                              <span>Loves {buddy.favoriteStyle}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{buddy.matchScore}%</div>
                            <p className="text-xs text-muted-foreground">Match</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{buddy.availability}</p>
                              <p className="text-muted-foreground text-xs">Availability</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{buddy.commonClasses} classes</p>
                              <p className="text-muted-foreground text-xs">Common interest</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button>
                            <Users className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                          <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default function CommunityHubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
          <p className="text-muted-foreground">Connect, compete, and grow together with fellow practitioners</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <CommunityHubContent />
        </Suspense>
      </div>
    </div>
  )
}
