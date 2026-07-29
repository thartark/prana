"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Smartphone,
  QrCode,
  Bell,
  CreditCard,
  Download,
  Star,
  Calendar,
  Users,
  Heart,
  CheckCircle2,
} from "lucide-react"

export default function MobileAppPage() {
  const features = [
    {
      icon: QrCode,
      title: "QR Code Check-In",
      description: "Instant check-in with your personal QR code",
      link: "/check-in/qr",
    },
    {
      icon: Bell,
      title: "Push Notifications",
      description: "Real-time alerts for class reminders and updates",
      link: "/notifications/preferences",
    },
    {
      icon: CreditCard,
      title: "Mobile Payments",
      description: "Apple Pay, Google Pay, and saved cards",
      link: "/payment-methods",
    },
    {
      icon: Calendar,
      title: "Class Booking",
      description: "Browse and book classes on the go",
      link: "/classes",
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Connect with fellow yogis anytime",
      link: "/community",
    },
    {
      icon: Heart,
      title: "Practice Tracking",
      description: "Track your progress and achievements",
      link: "/dashboard",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <Badge className="mb-4">Mobile Experience</Badge>
          <h1 className="text-4xl font-bold mb-4">Yoga Studio Mobile App</h1>
          <p className="text-xl text-muted-foreground">
            Manage your practice from anywhere with our mobile-optimized platform
          </p>
        </div>

        {/* App Download Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Smartphone className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Download Our Mobile App</h2>
            <p className="text-muted-foreground mb-6">Get the best experience with our native iOS and Android apps</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="min-w-[200px]">
                <Download className="h-5 w-5 mr-2" />
                App Store
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent">
                <Download className="h-5 w-5 mr-2" />
                Google Play
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Mobile Features</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-1">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <Link href={feature.link}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Use the Mobile App?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Faster Check-In</h4>
                <p className="text-sm text-muted-foreground">
                  Scan your QR code at the kiosk for instant check-in - no typing required
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Never Miss a Class</h4>
                <p className="text-sm text-muted-foreground">
                  Get push notifications 1 hour before class starts and waitlist updates
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Book Anytime, Anywhere</h4>
                <p className="text-sm text-muted-foreground">
                  Browse classes and book your spot even when you're away from your computer
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Secure Mobile Payments</h4>
                <p className="text-sm text-muted-foreground">
                  Pay with Apple Pay, Google Pay, or save your card for quick checkout
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Offline Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Access your QR code and upcoming bookings even without internet
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Track Your Progress</h4>
                <p className="text-sm text-muted-foreground">
                  View your practice stats, achievements, and goals all in one place
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">App Store Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <p className="text-sm text-muted-foreground">Classes Booked</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/check-in/qr">Get Your QR Code</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/payment-methods">Setup Mobile Payments</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
