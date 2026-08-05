import { Button } from "@/components/ui/button"
import Link from "next/link"
import { studioConfig } from "@/lib/studio-config"
import { HomeSchedulePreview } from "@/components/home-schedule-preview"
import { MapPin, Clock, Car, Backpack, Heart, Users, Star, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="surface-breath relative overflow-hidden border-b px-4 py-20 sm:py-28">
        <div className="container mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <MapPin className="h-4 w-4" />
            {studioConfig.city}
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {studioConfig.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
            {studioConfig.tagline} Yoga classes, workshops, and community in the heart of Northwest Arkansas.
          </p>

          {/* Intro offer */}
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-2xl font-bold text-foreground">{studioConfig.introOffer.headline}</p>
            <p className="mt-1 text-sm text-muted-foreground">{studioConfig.introOffer.subtext}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
                <Link href="/memberships">Claim intro offer</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/classes">View full schedule</Link>
              </Button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
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

      {/* This week's schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">This week at {studioConfig.shortName}</h2>
            <p className="mt-1 text-muted-foreground">Next classes on the schedule — book in seconds.</p>
          </div>
          <HomeSchedulePreview />
          <div className="mt-6 text-center">
            <Button variant="link" asChild>
              <Link href="/classes">
                See the full schedule <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Visit us / first time */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Your first visit</h2>
            <p className="mt-1 text-muted-foreground">Everything you need to walk in the door.</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Where</h3>
              <p className="text-sm text-muted-foreground">{studioConfig.address}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Hours</h3>
              <p className="text-sm text-muted-foreground">{studioConfig.hours}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Parking</h3>
              <p className="text-sm text-muted-foreground">{studioConfig.parking}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Backpack className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">What to bring</h3>
              <p className="text-sm text-muted-foreground">{studioConfig.whatToBring}</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Questions? Call{" "}
            <a href={`tel:${studioConfig.phone}`} className="text-primary hover:underline">
              {studioConfig.phone}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${studioConfig.email}`} className="text-primary hover:underline">
              {studioConfig.email}
            </a>
            .
          </div>
        </div>
      </section>

      {/* Ways to practice */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Ways to practice</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <Link href="/memberships" className="rounded-xl border p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-1 font-semibold">Memberships & packs</h3>
              <p className="text-sm text-muted-foreground">Unlimited monthly, class packs, and family plans.</p>
            </Link>
            <Link href="/workshops" className="rounded-xl border p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-1 font-semibold">Workshops & retreats</h3>
              <p className="text-sm text-muted-foreground">Deepen your practice with special events and trainings.</p>
            </Link>
            <Link href="/instructors" className="rounded-xl border p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-1 font-semibold">Meet the instructors</h3>
              <p className="text-sm text-muted-foreground">Certified teachers across every style and level.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Platform footnote (demoted feature framing) */}
      <section className="border-t bg-muted/30 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {studioConfig.shortName} runs on a complete studio platform — scheduling, memberships, payroll, retail,
            analytics, and more, built by {studioConfig.builtBy}.
          </p>
        </div>
      </section>
    </main>
  )
}
