"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const studios = [
  {
    id: "1",
    name: "Downtown Studio",
    address: "123 Main St",
    status: "active",
    capacity: 45,
  },
  {
    id: "2",
    name: "Uptown Wellness Center",
    address: "456 Park Ave",
    status: "active",
    capacity: 60,
  },
  {
    id: "3",
    name: "Westside Yoga Loft",
    address: "789 West Blvd",
    status: "active",
    capacity: 30,
  },
  {
    id: "4",
    name: "East End Studio",
    address: "321 East St",
    status: "coming-soon",
    capacity: 50,
  },
]

export function StudioSwitcher() {
  const [open, setOpen] = useState(false)
  const [selectedStudio, setSelectedStudio] = useState(studios[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between bg-transparent"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{selectedStudio.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search studios..." />
          <CommandList>
            <CommandEmpty>No studio found.</CommandEmpty>
            <CommandGroup>
              {studios.map((studio) => (
                <CommandItem
                  key={studio.id}
                  value={studio.name}
                  onSelect={() => {
                    setSelectedStudio(studio)
                    setOpen(false)
                  }}
                  disabled={studio.status === "coming-soon"}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedStudio.id === studio.id ? "opacity-100" : "opacity-0")}
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{studio.name}</span>
                      {studio.status === "coming-soon" && (
                        <Badge variant="secondary" className="text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {studio.address} • {studio.capacity} capacity
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="border-t p-2">
            <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New Location
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
