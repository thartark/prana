"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSwitcher } from "@/components/app-switcher"
import { createBrowserClient } from "@/lib/supabase/client"
import { getMockDataManager } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

type Persona = "member" | "instructor" | "owner"
const PERSONA_KEY = "trailside_demo_persona"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [persona, setPersona] = useState<Persona>("owner")
  const supabase = createBrowserClient()
  const useMockMode = !supabase

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem(PERSONA_KEY) as Persona | null) : null
    if (saved === "member" || saved === "instructor" || saved === "owner") setPersona(saved)
  }, [])

  const changePersona = (p: Persona) => {
    setPersona(p)
    if (typeof window !== "undefined") localStorage.setItem(PERSONA_KEY, p)
  }

  useEffect(() => {
    const getUser = async () => {
      if (useMockMode) {
        const mockManager = getMockDataManager()
        const mockUser = mockManager.getCurrentUser()
        setUser({ id: mockUser.id, email: mockUser.email })
        setProfile(mockUser)
        return
      }

      if (!supabase) return

      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setProfile(profile)
      }
    }
    getUser()
  }, [useMockMode, supabase])

  const handleSignOut = async () => {
    if (useMockMode) {
      setUser(null)
      setProfile(null)
      setMobileOpen(false)
      router.push("/")
      return
    }

    if (supabase) {
      await supabase.auth.signOut()
    }
    setMobileOpen(false)
    router.push("/")
    router.refresh()
  }

  // In demo mode the persona switcher drives role; otherwise use the real profile role.
  const isAdmin = useMockMode ? persona === "owner" : profile?.role === "admin"
  const isInstructor = useMockMode ? persona === "instructor" : profile?.role === "instructor"

  // Don't show nav on auth pages
  if (pathname?.startsWith("/auth")) {
    return null
  }

  // Admin is intentionally NOT a public nav link — it's gated to the Owner persona
  // (in demo) / admin role (in prod) via the button on the right.
  const navLinks = [
    { href: "/classes", label: "Classes" },
    { href: "/instructors", label: "Instructors" },
    { href: "/workshops", label: "Workshops" },
    { href: "/memberships", label: "Plans" },
    { href: "/shop", label: "Shop" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-4">
        <Link href="/" className="text-lg font-semibold whitespace-nowrap shrink-0">
          Trailside Yoga
        </Link>

        <nav className="hidden lg:flex gap-4 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <AppSwitcher />
          {user ? (
            <>
              {isAdmin && (
                <Button variant="outline" size="sm" asChild className="hidden sm:flex bg-transparent">
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              {isInstructor && !isAdmin && (
                <Button variant="outline" size="sm" asChild className="hidden sm:flex bg-transparent">
                  <Link href="/instructor/dashboard">Instructor</Link>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {profile?.full_name || user.email?.split("@")[0] || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/notifications">Notifications</Link>
                  </DropdownMenuItem>
                  {isInstructor && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/instructor/availability">Availability</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/instructor/time-off">Time Off</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem asChild className="sm:hidden">
                      <Link href="/admin">Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/sign-up">Start</Link>
              </Button>
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === link.href ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    Admin
                  </Link>
                )}
                {isInstructor && (
                  <Link
                    href="/instructor/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    Instructor
                  </Link>
                )}
                {!user && (
                  <>
                    <hr className="my-2" />
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium text-muted-foreground hover:text-primary"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {useMockMode && (
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-xs text-yellow-700 dark:text-yellow-400">
          <span>Demo mode — explore as:</span>
          <div className="flex overflow-hidden rounded-md border border-yellow-500/30">
            {(["member", "instructor", "owner"] as const).map((p) => (
              <button
                key={p}
                onClick={() => changePersona(p)}
                className={cn(
                  "px-2.5 py-0.5 capitalize transition-colors",
                  persona === p
                    ? "bg-yellow-500/30 font-medium text-yellow-900 dark:text-yellow-100"
                    : "hover:bg-yellow-500/10",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
