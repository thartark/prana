import { ClassSchedule } from "@/components/class-schedule"

export default function ClassesPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight">Class Schedule</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find a class by day, time, style, or instructor — and book in two taps.
          </p>
        </div>

        <ClassSchedule />
      </main>
    </div>
  )
}
