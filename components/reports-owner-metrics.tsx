"use client"

import { useEffect, useMemo, useState } from "react"
import { getMockData } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Comp assumptions used to estimate class profitability (base + per-head).
const BASE_PAY = 30
const PER_HEAD = 4
const SOURCES = ["Referral", "Instagram", "Google", "Walk-in", "Event"]

const money = (n: number) => `$${Math.round(n).toLocaleString()}`
const pct = (n: number) => `${n.toFixed(1)}%`

export function ReportsOwnerMetrics() {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    setData(getMockData())
  }, [])

  const m = useMemo(() => {
    if (!data) return null
    const classesById: Record<string, any> = {}
    ;(data.classes || []).forEach((c: any) => (classesById[c.id] = c))
    const insts = data.classInstances || []

    let totalRev = 0
    let totalHours = 0
    let totalBooked = 0
    let totalCap = 0
    const byRoom: Record<string, { booked: number; cap: number }> = {}
    const byInstr: Record<string, { booked: number; cap: number }> = {}
    const byClass: Record<string, { rev: number; cost: number; hours: number }> = {}

    insts.forEach((ci: any) => {
      const cls = classesById[ci.class_id]
      const price = cls?.price ?? 20
      const hours = (cls?.duration ?? 60) / 60
      const rev = ci.booked_count * price
      const cost = BASE_PAY + PER_HEAD * ci.booked_count
      totalRev += rev
      totalHours += hours
      totalBooked += ci.booked_count
      totalCap += ci.capacity
      ;(byRoom[ci.room_name] ||= { booked: 0, cap: 0 }).booked += ci.booked_count
      byRoom[ci.room_name].cap += ci.capacity
      ;(byInstr[ci.instructor_name] ||= { booked: 0, cap: 0 }).booked += ci.booked_count
      byInstr[ci.instructor_name].cap += ci.capacity
      const k = (byClass[ci.class_name] ||= { rev: 0, cost: 0, hours: 0 })
      k.rev += rev
      k.cost += cost
      k.hours += hours
    })

    const rooms = Object.entries(byRoom)
      .map(([name, v]) => ({ name, util: v.cap ? (v.booked / v.cap) * 100 : 0 }))
      .sort((a, b) => b.util - a.util)

    const instructors = Object.entries(byInstr)
      .map(([name, v]) => ({ name, fill: v.cap ? (v.booked / v.cap) * 100 : 0 }))
      .sort((a, b) => b.fill - a.fill)

    const classes = Object.entries(byClass)
      .map(([name, v]) => ({
        name,
        rev: v.rev,
        net: v.rev - v.cost,
        margin: v.rev ? ((v.rev - v.cost) / v.rev) * 100 : 0,
        revPerHour: v.hours ? v.rev / v.hours : 0,
      }))
      .sort((a, b) => b.net - a.net)

    // LTV by acquisition source (source synthesized deterministically for the demo)
    const typesById: Record<string, any> = {}
    ;(data.membershipTypes || []).forEach((t: any) => (typesById[t.id] = t))
    const activeByUser: Record<string, any> = {}
    ;(data.memberships || []).forEach((mb: any) => {
      if (mb.status === "active") activeByUser[mb.user_id] = mb
    })
    const bySource: Record<string, { count: number; ltvSum: number }> = {}
    ;(data.clients || []).forEach((c: any, idx: number) => {
      const src = SOURCES[idx % SOURCES.length]
      const mb = activeByUser[c.id]
      const monthly = mb ? typesById[mb.membership_type_id]?.price ?? 85 : 85
      let months = 6 + (idx % 24)
      if (c.joined_date) {
        const diff = (Date.now() - new Date(c.joined_date).getTime()) / (1000 * 60 * 60 * 24 * 30)
        if (diff > 0) months = Math.round(diff)
      }
      const ltv = monthly * months
      const s = (bySource[src] ||= { count: 0, ltvSum: 0 })
      s.count++
      s.ltvSum += ltv
    })
    const sources = Object.entries(bySource)
      .map(([name, v]) => ({ name, members: v.count, avgLtv: v.count ? v.ltvSum / v.count : 0 }))
      .sort((a, b) => b.avgLtv - a.avgLtv)

    return {
      revPerHour: totalHours ? totalRev / totalHours : 0,
      overallUtil: totalCap ? (totalBooked / totalCap) * 100 : 0,
      totalRev,
      rooms,
      instructors,
      classes,
      sources,
    }
  }, [data])

  if (!m) return null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Owner metrics</h2>
        <p className="text-sm text-muted-foreground">Profitability and utilization across the current schedule.</p>
      </div>

      {/* Headline tiles */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue / class hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{money(m.revPerHour)}</div>
            <p className="text-xs text-muted-foreground">Across all scheduled classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Room utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pct(m.overallUtil)}</div>
            <p className="text-xs text-muted-foreground">Booked seats vs. capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projected class revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{money(m.totalRev)}</div>
            <p className="text-xs text-muted-foreground">Drop-in equivalent, 2-week schedule</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Class profitability */}
        <Card>
          <CardHeader>
            <CardTitle>Class profitability</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Net</TableHead>
                  <TableHead className="text-right">Margin</TableHead>
                  <TableHead className="text-right">$/hr</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {m.classes.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-right">{money(c.rev)}</TableCell>
                    <TableCell className="text-right">{money(c.net)}</TableCell>
                    <TableCell className="text-right">{pct(c.margin)}</TableCell>
                    <TableCell className="text-right">{money(c.revPerHour)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* LTV by acquisition source */}
        <Card>
          <CardHeader>
            <CardTitle>LTV by acquisition source</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Members</TableHead>
                  <TableHead className="text-right">Avg LTV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {m.sources.map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-right">{s.members}</TableCell>
                    <TableCell className="text-right">{money(s.avgLtv)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Room utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Room utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead className="text-right">Utilization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {m.rooms.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-right">{pct(r.util)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Instructor fill rate */}
        <Card>
          <CardHeader>
            <CardTitle>Instructor fill rate</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instructor</TableHead>
                  <TableHead className="text-right">Fill rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {m.instructors.map((i) => (
                  <TableRow key={i.name}>
                    <TableCell className="font-medium">{i.name}</TableCell>
                    <TableCell className="text-right">{pct(i.fill)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
