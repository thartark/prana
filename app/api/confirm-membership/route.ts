import { createClient } from "@/lib/supabase/server"
import { getStripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { paymentIntentId, userId, membershipTypeId } = await request.json()

    const supabase = await createClient()
    const stripe = getStripe()

    if (!supabase || !stripe) {
      return NextResponse.json(
        { error: "Payments are not configured on this deployment (mock mode)." },
        { status: 503 },
      )
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the payment actually succeeded and its metadata matches.
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    if (
      paymentIntent.metadata?.userId !== userId ||
      paymentIntent.metadata?.membershipTypeId !== membershipTypeId
    ) {
      return NextResponse.json({ error: "Payment metadata mismatch" }, { status: 400 })
    }

    // Idempotency: never double-grant a membership for the same intent.
    const { data: existing } = await supabase
      .from("memberships")
      .select("id")
      .eq("stripe_payment_intent_id", paymentIntentId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ success: true, membership: existing, idempotent: true })
    }

    const { data: membershipType, error: membershipError } = await supabase
      .from("membership_types")
      .select("*")
      .eq("id", membershipTypeId)
      .single()

    if (membershipError || !membershipType) {
      return NextResponse.json({ error: "Membership type not found" }, { status: 404 })
    }

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + membershipType.validity_days)

    const { data: membership, error: insertError } = await supabase
      .from("memberships")
      .insert({
        user_id: userId,
        membership_type_id: membershipTypeId,
        classes_remaining: membershipType.class_count,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        status: "active",
        stripe_payment_intent_id: paymentIntentId,
      })
      .select()
      .single()

    if (insertError) {
      console.error("[prana] Error creating membership:", insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Record revenue so /admin/finances/revenue is a single query.
    await supabase.from("revenue_records").insert({
      user_id: userId,
      category: "membership",
      amount_cents: membershipType.price_cents,
      description: `Membership: ${membershipType.name}`,
      stripe_payment_intent_id: paymentIntentId,
    })

    return NextResponse.json({ success: true, membership })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error"
    console.error("[prana] Error confirming membership:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
