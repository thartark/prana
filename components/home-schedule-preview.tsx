"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getMockData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}
function dayLabel(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export function HomeSchedulePreview() {
  const [rows, setRows] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const data = getMockData()
    const classesById: Record<string, any> = {}
    ;(data.classes || []).forEach((c: any) => (classesById[c.id] = c))
    const now = Date.now()
    const upcoming = (data.classInstances || [])
      .filter((ci: any) => new Date(ci.start_time).getTime() >= now)
      .sort((a: any, b: any) => a.start_time.localeCompare(b.start_time))
      .slice(0, 6)
      .map((ci: any) => ({ ...ci, _cls: classesById[ci.class_id] }))
    setRows(upcoming)
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="py-8 text-center text-sm text-muted-foreground">Loading this week…</div>
  }

  return (
    <div className="mx-auto max-w-3xl divide-y rounded-lg border bg-card">
      {rows.map((ci) => {
        const spots = Math.max(0, ci.capacity - ci.booked_count)
        return (
          <div key={ci.id} className="flex items-center gap-4 p-4">
            <div className="w-28 shrink-0 text-sm">
              <div className="font-medium">{dayLabel(ci.date)}</div>
              <div className="text-muted-foreground">{fmtTime(ci.start_time)}</div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium">{ci.class_name}</div>
              <div className="truncate text-xs text-muted-foreground">
                {ci.instructor_name} · {ci.room_name}
              </div>
            </div>
            <div className="hidden shrink-0 sm:block">
              {spots <= 0 ? (
                <Badge variant="destructive">Full</Badge>
              ) : (
                <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
                  {spots} open
                </Badge>
              )}
            </div>
            <Button size="sm" variant="outline" asChild className="shrink-0">
              <Link href="/classes">Book</Link>
            </Button>
          </div>
        )
      })}
    </div>
  )
}
