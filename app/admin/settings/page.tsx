"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { studioConfig } from "@/lib/studio-config"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const [studio, setStudio] = useState({
    name: studioConfig.name,
    city: studioConfig.city,
    email: "hello@trailsideyoga.com",
    phone: "(479) 555-0142",
    timezone: studioConfig.timezone,
  })
  const [policy, setPolicy] = useState({
    cancellationWindow: "12",
    advanceBooking: "30",
    autoWaitlist: true,
    lateCancelFee: false,
  })
  const [notify, setNotify] = useState({
    bookingConfirmations: true,
    classReminders: true,
    marketing: false,
    smsReminders: true,
  })

  const save = () => toast.success("Settings saved", { description: "Your studio settings have been updated. (Demo)" })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your studio settings</p>
        </div>
        <Button onClick={save}>Save changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Studio Information</CardTitle>
          <CardDescription>Your studio details and how members can reach you.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="s-name">Studio name</Label>
            <Input id="s-name" value={studio.name} onChange={(e) => setStudio({ ...studio, name: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="s-city">City</Label>
            <Input id="s-city" value={studio.city} onChange={(e) => setStudio({ ...studio, city: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="s-email">Contact email</Label>
            <Input id="s-email" type="email" value={studio.email} onChange={(e) => setStudio({ ...studio, email: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="s-phone">Phone</Label>
            <Input id="s-phone" value={studio.phone} onChange={(e) => setStudio({ ...studio, phone: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="s-tz">Timezone</Label>
            <Select value={studio.timezone} onValueChange={(v) => setStudio({ ...studio, timezone: v })}>
              <SelectTrigger id="s-tz">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Chicago">Central (America/Chicago)</SelectItem>
                <SelectItem value="America/New_York">Eastern (America/New_York)</SelectItem>
                <SelectItem value="America/Denver">Mountain (America/Denver)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific (America/Los_Angeles)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Policy</CardTitle>
          <CardDescription>Rules that govern how members book and cancel.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="p-cancel">Free cancellation window (hours)</Label>
            <Input id="p-cancel" type="number" value={policy.cancellationWindow} onChange={(e) => setPolicy({ ...policy, cancellationWindow: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="p-advance">Advance booking limit (days)</Label>
            <Input id="p-advance" type="number" value={policy.advanceBooking} onChange={(e) => setPolicy({ ...policy, advanceBooking: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Separator className="my-1" />
          </div>
          <ToggleRow
            label="Auto-promote from waitlist"
            hint="When a spot frees up, offer it to the next person automatically."
            checked={policy.autoWaitlist}
            onChange={(v) => setPolicy({ ...policy, autoWaitlist: v })}
          />
          <ToggleRow
            label="Charge late-cancellation fee"
            hint="Apply a fee for cancellations inside the window."
            checked={policy.lateCancelFee}
            onChange={(v) => setPolicy({ ...policy, lateCancelFee: v })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Which automated messages your studio sends.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <ToggleRow label="Booking confirmations" hint="Email members when they book." checked={notify.bookingConfirmations} onChange={(v) => setNotify({ ...notify, bookingConfirmations: v })} />
          <ToggleRow label="Class reminders" hint="Remind members before class." checked={notify.classReminders} onChange={(v) => setNotify({ ...notify, classReminders: v })} />
          <ToggleRow label="SMS reminders" hint="Send reminders by text." checked={notify.smsReminders} onChange={(v) => setNotify({ ...notify, smsReminders: v })} />
          <ToggleRow label="Marketing emails" hint="Occasional promotions and news." checked={notify.marketing} onChange={(v) => setNotify({ ...notify, marketing: v })} />
        </CardContent>
      </Card>
    </div>
  )
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string
  hint: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
