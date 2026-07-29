import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr"

const hasSupabaseConfig =
  typeof window !== "undefined" && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const globalForSupabase = globalThis as unknown as {
  supabaseClient: ReturnType<typeof createBrowserClientSSR> | undefined
}

let browserClientInstance: ReturnType<typeof createBrowserClientSSR> | null = null

export function createClient() {
  if (!hasSupabaseConfig) {
    console.warn("[Prana Planner] Supabase not configured - using mock mode")
    return null
  }

  if (globalForSupabase.supabaseClient) {
    return globalForSupabase.supabaseClient
  }

  if (browserClientInstance) {
    return browserClientInstance
  }

  globalForSupabase.supabaseClient = createBrowserClientSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: "sb-client-auth-token",
      },
    },
  )

  browserClientInstance = globalForSupabase.supabaseClient

  return globalForSupabase.supabaseClient
}

export function createBrowserClient() {
  return createClient()
}
