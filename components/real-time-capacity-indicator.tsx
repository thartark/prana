"use client"

import { useState, useEffect } from "react"
import { Users, TrendingUp, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CapacityIndicatorProps {
  current: number
  capacity: number
  waitlist: number
  showTrend?: boolean
  className?: string
}

export function RealTimeCapacityIndicator({
  current,
  capacity,
  waitlist,
  showTrend = true,
  className = "",
}: CapacityIndicatorProps) {
  const [liveCount, setLiveCount] = useState(current)
  const percentFull = (liveCount / capacity) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate bookings coming in
      const change = Math.random() > 0.5 ? 1 : -1
      setLiveCount((prev) => Math.max(0, Math.min(capacity, prev + change)))
    }, 30000)

    return () => clearInterval(interval)
  }, [capacity])

  const getStatusColor = () => {
    if (percentFull >= 90) return "bg-red-500"
    if (percentFull >= 70) return "bg-amber-500"
    return "bg-green-500"
  }

  const getStatusText = () => {
    if (liveCount >= capacity) return "Full"
    if (percentFull >= 90) return "Almost Full"
    if (percentFull >= 70) return "Filling Fast"
    return "Available"
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {liveCount}/{capacity} spots
          </span>
        </div>
        <Badge variant={liveCount >= capacity ? "destructive" : "default"}>{getStatusText()}</Badge>
      </div>

      <Progress value={percentFull} className="h-2" />

      {waitlist > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{waitlist} on waitlist</span>
        </div>
      )}

      {showTrend && percentFull > 50 && (
        <div className="flex items-center gap-1 text-xs text-amber-600">
          <TrendingUp className="h-3 w-3" />
          <span>Booking quickly</span>
        </div>
      )}
    </div>
  )
}
