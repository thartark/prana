"use client"

import Link from "next/link"
import { ChevronsUpDown, Check } from "lucide-react"
import { HAYARTA_APPS, type HayartaApp } from "@hayarta/ui"
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
 * Hayarta Labs product switcher — the shared cross-product nav element.
 * The product list is the single source of truth from @hayarta/ui
 * (HAYARTA_APPS); it's rendered here with Prana's own primitives so it wears
 * the blush skin. "Shared bones, own skin."
 */
const CURRENT = "prana"

function Mark({ app, size = 22 }: { app: HayartaApp; size?: number }) {
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
  const active = HAYARTA_APPS.find((a) => a.key === CURRENT) ?? HAYARTA_APPS[0]

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
        {HAYARTA_APPS.map((app) => {
          const isCurrent = app.key === CURRENT
          const inner = (
            <>
              <Mark app={app} size={26} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{app.name}</span>
                {app.tagline && (
                  <span className="block truncate text-xs text-muted-foreground">{app.tagline}</span>
                )}
              </span>
              {app.status && (
                <Badge variant={statusVariant[app.status]} className="capitalize">
                  {app.status}
                </Badge>
              )}
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
