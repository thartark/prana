"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Clock, List } from "lucide-react"

export default function PlaylistsPage() {
  const [playlists] = useState([
    {
      id: 1,
      name: "Morning Routine",
      description: "Start your day with energy",
      videos: 8,
      duration: "240 min",
      thumbnail: "/yoga-sunrise-flow.jpg",
    },
    {
      id: 2,
      name: "Flexibility Focus",
      description: "Improve your range of motion",
      videos: 12,
      duration: "360 min",
      thumbnail: "/yoga-stretching.png",
    },
    {
      id: 3,
      name: "Stress Relief",
      description: "Calm your mind and body",
      videos: 6,
      duration: "150 min",
      thumbnail: "/yin-yoga-evening.jpg",
    },
  ])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Playlists</h1>
          <p className="text-muted-foreground">Organize your favorite videos into custom playlists</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Playlist
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <List className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Create a playlist to organize your favorite videos</p>
            <Button variant="outline">Create Playlist</Button>
          </CardContent>
        </Card>

        {playlists.map((playlist) => (
          <Card key={playlist.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={playlist.thumbnail || "/placeholder.svg"}
                alt={playlist.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="lg" className="rounded-full h-16 w-16">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{playlist.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{playlist.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <Badge variant="secondary">{playlist.videos} videos</Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {playlist.duration}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
