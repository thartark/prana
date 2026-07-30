import { createServerClient as createServerClientSSR } from "@supabase/ssr"
import { cookies } from "next/headers"

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

type SupabaseServerClient = ReturnType<typeof createServerClientSSR>

const serverClientCache = new Map<string, SupabaseServerClient>()

/**
 * Server-side Supabase client. Returns `null` when Supabase is not configured
 * (zero-env demo). Callers MUST branch on null and fall back to the mock repo
 * (`mockDataManager`), which is server-safe — see lib/mock-data.ts. This is the
 * repository contract: no page should assume a live client exists.
 */
export async function createClient(): Promise<SupabaseServerClient | null> {
  if (!isSupabaseConfigured()) {
    return null
  }

  const cacheKey = "supabase-server-client"
  const cached = serverClientCache.get(cacheKey)
  if (cached) return cached

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
            // Called from a Server Component — safe to ignore; middleware refreshes sessions.
          }
        },
      },
    },
  )

  serverClientCache.set(cacheKey, client)
  return client
}

export async function createServerClient(): Promise<SupabaseServerClient | null> {
  return createClient()
}
