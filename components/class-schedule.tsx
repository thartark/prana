"use client"

import { useEffect, useMemo, useState } from "react"
import { getMockData } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Parse a "YYYY-MM-DD" string as a *local* date (avoids UTC off-by-one).
function localDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d)
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}
function fmtDayLabel(dateStr: string) {
  return localDate(dateStr).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
}

const TIME_BANDS = [
  { key: "all", label: "All day" },
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "evening", label: "Evening" },
]

export function ClassSchedule() {
  const [mounted, setMounted] = useState(false)
  const [instances, setInstances] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState("")
  const [style, setStyle] = useState("all")
  const [level, setLevel] = useState("all")
  const [instructor, setInstructor] = useState("all")
  const [band, setBand] = useState("all")

  const [countById, setCountById] = useState<Record<string, number>>({})
  const [bookedIds, setBookedIds] = useState<Set<string>>(new Set())
  const [waitlistedIds, setWaitlistedIds] = useState<Set<string>>(new Set())
  const [pendingId, setPendingId] = useState<string | null>(null)

  useEffect(() => {
    const data = getMockData()
    const classesById: Record<string, any> = {}
    ;(data.classes || []).forEach((c: any) => (classesById[c.id] = c))
    const insts = (data.classInstances || []).map((ci: any, i: number) => ({
      ...ci,
      _cls: classesById[ci.class_id],
      is_sub: i % 11 === 0, // deterministic demo flag for substitute-instructor coverage
    }))
    const counts: Record<string, number> = {}
    insts.forEach((ci: any) => (counts[ci.id] = ci.booked_count))
    const dates = [...new Set(insts.map((ci: any) => ci.date))].sort()
    setInstances(insts)
    setCountById(counts)
    setSelectedDate(dates[0] || "")
    setMounted(true)
  }, [])

  const dates = useMemo(() => [...new Set(instances.map((ci) => ci.date))].sort(), [instances])
  const styles = useMemo(
    () => [...new Set(instances.map((ci) => ci._cls?.style).filter(Boolean))].sort(),
    [instances],
  )
  const levels = useMemo(
    () => [...new Set(instances.map((ci) => ci._cls?.difficulty_level).filter(Boolean))].sort(),
    [instances],
  )
  const instructors = useMemo(
    () => [...new Set(instances.map((ci) => ci.instructor_name).filter(Boolean))].sort(),
    [instances],
  )

  const dayClasses = useMemo(() => {
    return instances
      .filter((ci) => ci.date === selectedDate)
      .filter((ci) => style === "all" || ci._cls?.style === style)
      .filter((ci) => level === "all" || ci._cls?.difficulty_level === level)
      .filter((ci) => instructor === "all" || ci.instructor_name === instructor)
      .filter((ci) => {
        if (band === "all") return true
        const h = new Date(ci.start_time).getHours()
        if (band === "morning") return h < 12
        if (band === "afternoon") return h >= 12 && h < 17
        return h >= 17
      })
      .sort((a, b) => a.start_time.localeCompare(b.start_time))
  }, [instances, selectedDate, style, level, instructor, band])

  function handleBook(ci: any) {
    const spots = ci.capacity - (countById[ci.id] ?? ci.booked_count)
    if (pendingId !== ci.id) {
      setPendingId(ci.id) // first tap: arm confirm
      return
    }
    setPendingId(null) // second tap: commit
    const when = `${fmtDayLabel(ci.date)} · ${fmtTime(ci.start_time)}`
    if (spots <= 0) {
      setWaitlistedIds((s) => new Set(s).add(ci.id))
      toast.success("Added to the waitlist", {
        description: `${ci.class_name} — ${when}. We'll notify you if a spot opens.`,
      })
      return
    }
    setCountById((c) => ({ ...c, [ci.id]: (c[ci.id] ?? ci.booked_count) + 1 }))
    setBookedIds((s) => new Set(s).add(ci.id))
    toast.success("Class booked", { description: `${ci.class_name} — ${when}` })
  }

  const selectCls =
    "h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"

  if (!mounted) {
    return <div className="py-16 text-center text-muted-foreground">Loading schedule…</div>
  }

  return (
    <div className="space-y-6">
      {/* Date scrubber */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dates.map((d) => {
          const dt = localDate(d)
          const isToday = d === dates[0]
          const active = d === selectedDate
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={cn(
                "flex min-w-[68px] flex-col items-center rounded-lg border px-3 py-2 text-sm transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <span className="text-xs uppercase tracking-wide">
                {isToday ? "Today" : dt.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-lg font-semibold">{dt.getDate()}</span>
              <span className="text-[10px] uppercase">{dt.toLocaleDateString("en-US", { month: "short" })}</span>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select className={selectCls} value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="all">All styles</option>
          {styles.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select className={selectCls} value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="all">All levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {String(l).replace("_", " ")}
            </option>
          ))}
        </select>
        <select className={selectCls} value={instructor} onChange={(e) => setInstructor(e.target.value)}>
          <option value="all">All instructors</option>
          {instructors.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <div className="ml-auto flex rounded-md border border-input p-0.5">
          {TIME_BANDS.map((t) => (
            <button
              key={t.key}
              onClick={() => setBand(t.key)}
              className={cn(
                "rounded px-2.5 py-1 text-xs transition-colors",
                band === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm font-medium text-muted-foreground">{selectedDate && fmtDayLabel(selectedDate)}</p>

      {/* Schedule rows */}
      <div className="divide-y rounded-lg border">
        {dayClasses.length === 0 && (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            No classes match these filters on this day.
          </p>
        )}
        {dayClasses.map((ci) => {
          const count = countById[ci.id] ?? ci.booked_count
          const spots = Math.max(0, ci.capacity - count)
          const isBooked = bookedIds.has(ci.id)
          const isWaitlisted = waitlistedIds.has(ci.id)
          const isPending = pendingId === ci.id
          const price = ci._cls?.price
          return (
            <div key={ci.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              {/* Time */}
              <div className="w-24 shrink-0">
                <div className="font-semibold">{fmtTime(ci.start_time)}</div>
                <div className="text-xs text-muted-foreground">{ci._cls?.duration ?? 60} min</div>
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{ci.class_name}</span>
                  {ci._cls?.difficulty_level && (
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {String(ci._cls.difficulty_level).replace("_", " ")}
                    </Badge>
                  )}
                  {ci.is_sub && (
                    <Badge variant="secondary" className="text-[10px]">
                      Sub
                    </Badge>
                  )}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{ci.instructor_name}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {ci.room_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {fmtTime(ci.start_time)}–{fmtTime(ci.end_time)}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="w-28 shrink-0 text-sm sm:text-right">
                {typeof price === "number" && <div className="font-medium">${price} drop-in</div>}
                <div className="text-xs text-muted-foreground">Incl. in Unlimited</div>
              </div>

              {/* Spots */}
              <div className="w-24 shrink-0 sm:text-center">
                {spots <= 0 ? (
                  <Badge variant="destructive">Full</Badge>
                ) : spots <= 5 ? (
                  <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400">
                    {spots} left
                  </Badge>
                ) : (
                  <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
                    {spots} spots
                  </Badge>
                )}
              </div>

              {/* Action */}
              <div className="w-32 shrink-0">
                {isBooked ? (
                  <Button variant="outline" className="w-full" disabled>
                    Booked ✓
                  </Button>
                ) : isWaitlisted ? (
                  <Button variant="outline" className="w-full" disabled>
                    Waitlisted
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={spots <= 0 ? "outline" : isPending ? "secondary" : "default"}
                    onClick={() => handleBook(ci)}
                    onMouseLeave={() => isPending && setPendingId(null)}
                  >
                    {isPending ? "Confirm?" : spots <= 0 ? "Join waitlist" : "Book"}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
