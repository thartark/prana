import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = "active" | "pending" | "cancelled" | "completed" | "processing" | "error"

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    className:
      "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  },
  error: {
    label: "Error",
    icon: AlertCircle,
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  },
}

interface StatusBadgeProps {
  status: Status
  label?: string
  showIcon?: boolean
  className?: string
}

export function StatusBadge({ status, label, showIcon = true, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn("inline-flex items-center gap-1.5 font-medium transition-all", config.className, className)}
    >
      {showIcon && <Icon className={cn("h-3.5 w-3.5", status === "processing" && "animate-spin")} />}
      {label || config.label}
    </Badge>
  )
}
