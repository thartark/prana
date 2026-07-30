import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { studioConfig } from "@/lib/studio-config"
import {
  Calendar,
  Users,
  Award,
  ShoppingBag,
  Video,
  MessageSquare,
  TrendingUp,
  Settings,
  DollarSign,
  Clock,
  Heart,
  Star,
  Gift,
  MapPin,
} from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="surface-breath relative overflow-hidden border-b px-4 py-24 sm:py-32">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            <MapPin className="h-4 w-4" />
            {studioConfig.city}
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-balance mb-6 text-foreground">
            {studioConfig.name}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground text-pretty leading-relaxed">
            Find your balance in the heart of Northwest Arkansas. Join our welcoming community for yoga classes,
            workshops, private sessions, and holistic wellness experiences.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
              <Link href="/auth/sign-up">Join Our Studio</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/classes">View Schedule</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>All levels welcome</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Experienced instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span>Community focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Features */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-8 text-center text-2xl font-bold">Explore Features</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Classes & Scheduling</h4>
              <p className="text-sm text-muted-foreground mb-4">Browse classes, book sessions, manage waitlists</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/classes">View Classes →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Award className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Memberships</h4>
              <p className="text-sm text-muted-foreground mb-4">Unlimited plans, class packs, family memberships</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/memberships">View Plans →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Workshops & Events</h4>
              <p className="text-sm text-muted-foreground mb-4">Special events, retreats, teacher training</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/workshops">View Events →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Private Sessions</h4>
              <p className="text-sm text-muted-foreground mb-4">One-on-one and semi-private bookings</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/private-sessions">Book Now →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <ShoppingBag className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Retail Shop</h4>
              <p className="text-sm text-muted-foreground mb-4">Yoga mats, props, apparel, and accessories</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/shop">Shop Now →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <MessageSquare className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Community</h4>
              <p className="text-sm text-muted-foreground mb-4">Connect with members, share experiences</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/community">Join Community →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Video className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Class Recordings</h4>
              <p className="text-sm text-muted-foreground mb-4">Access on-demand video library</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/recordings">Watch Now →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Star className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Achievements</h4>
              <p className="text-sm text-muted-foreground mb-4">Track progress, earn badges, view stats</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/achievements">View Progress →</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Member Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-8 text-center text-2xl font-bold">Member Portal</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <Heart className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Your Dashboard</h4>
              <p className="text-sm text-muted-foreground mb-4">View bookings, memberships, and activity</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Your Profile</h4>
              <p className="text-sm text-muted-foreground mb-4">Manage personal info, preferences, medical details</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">Edit Profile</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <Gift className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Guest Passes</h4>
              <p className="text-sm text-muted-foreground mb-4">Share free trial classes with friends</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/guest-pass">Get Guest Pass</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet Our Instructors */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-4 text-center text-2xl font-bold">Meet Our Instructors</h3>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our certified instructors bring years of experience and passion to every class.
          </p>
          <div className="text-center">
            <Button asChild>
              <Link href="/instructors">View All Instructors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Staff & Admin Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-8 text-center text-2xl font-bold">Staff & Admin Tools</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <Settings className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Admin Dashboard</h4>
              <p className="text-sm text-muted-foreground mb-4">Complete studio management</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">Admin Panel</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Staff Management</h4>
              <p className="text-sm text-muted-foreground mb-4">Instructors, schedules, time-off</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/staff">Manage Staff</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <DollarSign className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Finances</h4>
              <p className="text-sm text-muted-foreground mb-4">Revenue, expenses, payouts, reports</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/finances">View Finances</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Analytics</h4>
              <p className="text-sm text-muted-foreground mb-4">Performance metrics and insights</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/analytics">View Analytics</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Highlight */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-12 text-center text-2xl font-bold">Why Trailside?</h3>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Your Yoga Home in Fayetteville</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're new to yoga or deepening your practice, our studio offers a supportive space to grow, heal, and connect.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-2 text-xl font-semibold">Smart Scheduling</h4>
              <p className="text-muted-foreground">Recurring classes, waitlists, auto-reminders, conflict detection</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-2 text-xl font-semibold">Flexible Memberships</h4>
              <p className="text-muted-foreground">Unlimited plans, class packs, family memberships, payment plans</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-2 text-xl font-semibold">Complete Financials</h4>
              <p className="text-muted-foreground">Revenue tracking, expense management, payroll, tax reports</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-2 text-xl font-semibold">Staff Tools</h4>
              <p className="text-muted-foreground">
                Availability tracking, time-off, certifications, performance reviews
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-2 text-xl font-semibold">Community Features</h4>
              <p className="text-muted-foreground">Social feed, achievements, buddy system, referral rewards</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h4 className="mb-2 text-xl font-semibold">Convenient Location</h4>
              <p className="text-muted-foreground">Easy access in Fayetteville with ample parking and a welcoming space</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
