import { createClient } from "@/lib/supabase/server"
import { getStripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { membershipTypeId, userId } = await request.json()

    const supabase = await createClient()
    const stripe = getStripe()

    // Zero-config mock mode: no Supabase/Stripe. The client-side checkout
    // simulates success; this route is only exercised with real credentials.
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

    const { data: membershipType, error: membershipError } = await supabase
      .from("membership_types")
      .select("*")
      .eq("id", membershipTypeId)
      .single()

    if (membershipError || !membershipType) {
      return NextResponse.json({ error: "Membership type not found" }, { status: 404 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: membershipType.price_cents,
      currency: "usd",
      metadata: {
        userId,
        membershipTypeId,
        membershipName: membershipType.name,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: membershipType.price_cents,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error"
    console.error("[prana] Error creating payment intent:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
