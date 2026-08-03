"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  UserCircle,
  Settings,
  LogOut,
  CheckSquare,
  BarChart3,
  Sparkles,
  TrendingUp,
  Tag,
  Bell,
  ShoppingBag,
  MapPin,
  Building2,
  Layers,
} from "lucide-react"

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Analytics", href: "/admin/analytics", icon: TrendingUp },
      { title: "Reports", href: "/admin/reports", icon: BarChart3 },
      { title: "Retention", href: "/admin/analytics/retention", icon: Users },
    ],
  },
  {
    label: "Programming",
    items: [
      { title: "Classes", href: "/admin/classes", icon: Calendar },
      { title: "Series & Courses", href: "/admin/series", icon: Calendar },
      { title: "Workshops", href: "/admin/workshops", icon: Sparkles },
      { title: "Retreats", href: "/admin/retreats", icon: Sparkles },
      { title: "Teacher Training", href: "/admin/teacher-training", icon: Sparkles },
      { title: "Holidays", href: "/admin/holidays", icon: Calendar },
    ],
  },
  {
    label: "People",
    items: [
      { title: "Clients", href: "/admin/clients", icon: Users },
      { title: "Instructors", href: "/admin/instructors", icon: UserCircle },
      { title: "Staff Management", href: "/admin/staff", icon: Users },
      { title: "User Roles", href: "/admin/users/roles", icon: Users },
    ],
  },
  {
    label: "Membership & Sales",
    items: [
      { title: "Memberships", href: "/admin/memberships", icon: CreditCard },
      { title: "Membership Tiers", href: "/admin/memberships/tiers", icon: Layers },
      { title: "Discount Codes", href: "/admin/memberships/discounts", icon: Tag },
      { title: "Corporate Programs", href: "/admin/corporate", icon: Building2 },
      { title: "Retail Products", href: "/admin/products", icon: ShoppingBag },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Finances", href: "/admin/finances", icon: TrendingUp },
      { title: "Payment Recovery", href: "/admin/billing/payment-recovery", icon: CreditCard },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Check-in", href: "/admin/check-in", icon: CheckSquare },
      { title: "Automated Reminders", href: "/admin/communications/automated-reminders", icon: Bell },
      { title: "Notifications", href: "/admin/notifications", icon: Bell },
    ],
  },
  {
    label: "Facilities & Settings",
    items: [
      { title: "Locations", href: "/admin/locations", icon: MapPin },
      { title: "Capacity & Rooms", href: "/admin/classes/capacity", icon: MapPin },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-semibold">Trailside Admin</h1>
      </div>

      <nav className="flex-1 space-y-6 p-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              {group.label}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
