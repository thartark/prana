import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CreateScheduleForm } from "@/components/create-schedule-form"

export default async function NewSchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  if (!supabase) return (
    <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
      This section uses live data. Connect a Supabase project to view it. <span className="text-foreground/70">(Demo mode)</span>
    </div>
  )

  const { data: classData } = await supabase.from("classes").select("*").eq("id", id).single()

  if (!classData) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Schedule - {classData.name}</h1>
        <p className="text-muted-foreground">Create a recurring schedule for this class</p>
      </div>

      <CreateScheduleForm classId={id} />
    </div>
  )
}
