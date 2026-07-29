"use client"

import { useEffect, useState } from "react"
import { Search, Calendar, User, Users, BookOpen, Sparkles } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { useMockData } from "@/lib/use-mock-data"

export function UniversalSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { classes, instructors, users } = useMockData()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (callback: () => void) => {
    setOpen(false)
    callback()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full max-w-sm"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search everything...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search classes, instructors, members, workshops..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Classes">
            {classes.slice(0, 5).map((cls) => (
              <CommandItem
                key={cls.id}
                onSelect={() => handleSelect(() => router.push(`/classes/${cls.id}`))}
                className="flex items-center gap-3"
              >
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{cls.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {cls.instructor} • {cls.time}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Instructors">
            {instructors.slice(0, 5).map((instructor) => (
              <CommandItem
                key={instructor.id}
                onSelect={() => handleSelect(() => router.push(`/instructors/${instructor.id}`))}
                className="flex items-center gap-3"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{instructor.name}</div>
                  <div className="text-xs text-muted-foreground">{instructor.specialty}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Members">
            {users.slice(0, 5).map((member) => (
              <CommandItem
                key={member.id}
                onSelect={() => handleSelect(() => router.push(`/admin/clients/${member.id}`))}
                className="flex items-center gap-3"
              >
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.email}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => handleSelect(() => router.push("/classes/new"))}
              className="flex items-center gap-3"
            >
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <span>Book a class</span>
            </CommandItem>
            <CommandItem
              onSelect={() => handleSelect(() => router.push("/admin/classes/new"))}
              className="flex items-center gap-3"
            >
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>Create new class</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
