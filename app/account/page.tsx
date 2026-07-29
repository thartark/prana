"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Heart, Phone, Calendar, CreditCard, Award, TrendingUp, BarChart } from "lucide-react"
import { useMockData } from "@/lib/use-mock-data"
import { useState, useEffect } from "react"

export default function AccountPage() {
  const { getMockData } = useMockData()
  const [profileData, setProfileData] = useState<any>(null)
  const [stats, setStats] = useState({
    totalBookings: 0,
    attendedClasses: 0,
    achievements: 0,
    activeMemberships: 0,
    upcomingClasses: 0,
  })

  useEffect(() => {
    const data = getMockData()
    setProfileData(data.currentUser)

    // Calculate stats
    const totalBookings = data.bookings?.filter((b: any) => b.user_id === data.currentUser.id).length || 0
    const attendedClasses =
      data.bookings?.filter((b: any) => b.user_id === data.currentUser.id && b.checked_in).length || 0
    const achievements = data.achievements?.filter((a: any) => a.user_id === data.currentUser.id).length || 0
    const activeMemberships = 2
    const upcomingClasses = 5

    setStats({ totalBookings, attendedClasses, achievements, activeMemberships, upcomingClasses })
  }, [])

  if (!profileData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Account</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your profile, track progress, and view memberships
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeMemberships}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.upcomingClasses}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.attendedClasses}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Activity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Achievement Unlocked</p>
                        <p className="text-sm text-muted-foreground">10 Classes Milestone</p>
                      </div>
                      <span className="text-sm text-muted-foreground">2d ago</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Class Booked</p>
                        <p className="text-sm text-muted-foreground">Vinyasa Flow with Sarah</p>
                      </div>
                      <span className="text-sm text-muted-foreground">3d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Quick Actions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <Button asChild className="w-full">
                    <Link href="/classes">Browse Classes</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/memberships">View Memberships</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/achievements">See Achievements</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBookings}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.attendedClasses}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.achievements}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {profileData.joined_date
                      ? new Date(profileData.joined_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button asChild>
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p className="text-base">{profileData?.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-base">{profileData?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-base">{profileData?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                    <p className="text-base">
                      {profileData?.date_of_birth
                        ? new Date(profileData.date_of_birth).toLocaleDateString()
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                    <Badge variant="secondary" className="capitalize">
                      {profileData?.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <CardTitle>Emergency Contact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p className="text-base">{profileData?.emergency_contact_name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-base">{profileData?.emergency_contact_phone || "Not provided"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    <CardTitle>Medical Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Medical Notes</p>
                    <p className="text-base">{profileData?.medical_notes || "None reported"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <CardTitle>Account Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                    <p className="text-base">
                      {profileData?.joined_date
                        ? new Date(profileData.joined_date).toLocaleDateString()
                        : "Not available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                    <Badge variant="default" className="capitalize">
                      {profileData?.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Classes This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">24</div>
                  <p className="text-sm text-muted-foreground">+6 from last month</p>
                  <Progress value={80} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">12 days</div>
                  <p className="text-sm text-muted-foreground">Personal best: 18 days</p>
                  <Progress value={66} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Minutes Practiced</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">1,440</div>
                  <p className="text-sm text-muted-foreground">24 hours total</p>
                  <Progress value={90} className="mt-4" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Progress Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart showing classes attended over time
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Flexibility</span>
                    <span className="text-sm text-muted-foreground">Advanced</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Balance</span>
                    <span className="text-sm text-muted-foreground">Intermediate</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Strength</span>
                    <span className="text-sm text-muted-foreground">Intermediate</span>
                  </div>
                  <Progress value={70} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Breathing</span>
                    <span className="text-sm text-muted-foreground">Advanced</span>
                  </div>
                  <Progress value={80} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Memberships Tab */}
          <TabsContent value="memberships" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Memberships</CardTitle>
                  <Button asChild>
                    <Link href="/memberships">Browse Memberships</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">Unlimited Monthly</h3>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Valid until: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      <p>Unlimited classes</p>
                      <p className="font-medium text-foreground mt-2">$149/month</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/membership/manage">Manage</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/membership/freeze">Freeze</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">10 Class Pack</h3>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>7 classes remaining</p>
                      <p>Expires: {new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      <Progress value={30} className="mt-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membership Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">Priority booking for all classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">10% discount on workshops and private sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">Free guest passes (2 per month)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">Access to members-only events</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
