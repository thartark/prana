import { createServerClient as createServerClientSSR } from "@supabase/ssr"
import { cookies } from "next/headers"

const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const serverClientCache = new Map<string, any>()

export async function createClient() {
  if (!hasSupabaseConfig) {
    console.warn("[v0] Supabase not configured - using mock data mode")
    return null as any
  }

  const cacheKey = "supabase-server-client"

  if (serverClientCache.has(cacheKey)) {
    return serverClientCache.get(cacheKey)
  }

  const cookieStore = await cookies()

  const client = createServerClientSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The "setAll" method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )

  serverClientCache.set(cacheKey, client)

  return client
}

export async function createServerClient() {
  return createClient()
}
