import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK_ROOMS = [
  { id: "rm1", name: "Main Studio", is_available: true, capacity: 30, amenities: ["heated_floors", "sound_system", "props_wall", "natural_light"], hourly_rate: 60 },
  { id: "rm2", name: "Loft Studio", is_available: true, capacity: 18, amenities: ["sound_system", "mirrors", "natural_light"], hourly_rate: 45 },
  { id: "rm3", name: "Meditation Room", is_available: true, capacity: 12, amenities: ["dim_lighting", "cushions", "sound_system"], hourly_rate: 30 },
  { id: "rm4", name: "Reformer Room", is_available: false, capacity: 8, amenities: ["reformers", "mirrors"], hourly_rate: null },
]

export default async function RoomsPage() {
  const supabase = await createServerClient()

  let rooms: any[] = MOCK_ROOMS
  if (supabase) {
    rooms = (await supabase.from("studio_rooms").select("*").order("name")).data || []
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Studio Rooms</h1>
          <p className="text-muted-foreground">Manage your studio spaces and rooms</p>
        </div>
        <Button asChild>
          <Link href="/admin/rooms/new">Add Room</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms?.map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{room.name}</CardTitle>
                <Badge variant={room.is_available ? "default" : "secondary"}>
                  {room.is_available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <CardDescription>Capacity: {room.capacity} people</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium mb-1">Amenities</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities?.map((amenity: string) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
                {room.hourly_rate && <p className="text-sm text-muted-foreground">Rental: ${room.hourly_rate}/hour</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
