import { createClient } from "@/lib/supabase/server"
import { getMockData } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { CreateScheduleForm } from "@/components/create-schedule-form"

export default async function NewSchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  let classData: any = null
  if (supabase) {
    classData = (await supabase.from("classes").select("*").eq("id", id).single()).data
    if (!classData) {
      notFound()
    }
  } else {
    const found = getMockData().classes?.find((c: any) => c.id === id)
    classData = { name: found?.name || "Class" }
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
