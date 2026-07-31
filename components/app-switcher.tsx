"use client"

import Link from "next/link"
import { ChevronsUpDown, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/**
 * Hayarta Labs product switcher — the shared cross-product nav element. Mirrors
 * @hayarta/ui's AppSwitcher, styled with Prana's own tokens so it wears the
 * blush skin ("shared bones, own skin"). Prana is the current app.
 */
type App = {
  key: string
  name: string
  tagline: string
  color: string
  status: "live" | "beta" | "soon"
  href?: string
}

const APPS: App[] = [
  { key: "prana", name: "Prana", tagline: "Studio management", color: "#a6547a", status: "live", href: "https://prana-nu.vercel.app" },
  { key: "catalyst", name: "Catalyst", tagline: "Funding signals", color: "#e3a138", status: "beta" },
  { key: "ledger", name: "Ledger", tagline: "Renewals & spend", color: "#b87333", status: "beta" },
  { key: "tell", name: "Tell", tagline: "Customer signal", color: "#8b5cf6", status: "beta" },
  { key: "footprint", name: "Footprint", tagline: "Permits, pre-launch", color: "#3b82f6", status: "beta" },
]

const CURRENT = "prana"

function Mark({ app, size = 22 }: { app: App; size?: number }) {
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-[6px] font-semibold text-white"
      style={{ width: size, height: size, background: app.color, fontSize: size * 0.5 }}
    >
      {app.name[0]}
    </span>
  )
}

const statusVariant = { live: "default", beta: "secondary", soon: "outline" } as const

export function AppSwitcher() {
  const active = APPS.find((a) => a.key === CURRENT)!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-2.5 text-sm font-medium transition-colors hover:bg-muted"
          aria-label="Switch Hayarta app"
        >
          <Mark app={active} size={18} />
          <span className="hidden sm:inline">{active.name}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
          Hayarta Labs
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {APPS.map((app) => {
          const isCurrent = app.key === CURRENT
          const inner = (
            <>
              <Mark app={app} size={26} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{app.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{app.tagline}</span>
              </span>
              <Badge variant={statusVariant[app.status]} className="capitalize">
                {app.status}
              </Badge>
              {isCurrent && <Check className="ml-1 h-4 w-4 text-primary" />}
            </>
          )
          return (
            <DropdownMenuItem key={app.key} asChild className="gap-3 py-2" aria-current={isCurrent}>
              {app.href ? (
                <Link href={app.href} target={isCurrent ? undefined : "_blank"}>
                  {inner}
                </Link>
              ) : (
                <div className="cursor-default opacity-80">{inner}</div>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
