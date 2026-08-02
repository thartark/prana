"use client"

import { useCallback } from "react"
import { getMockData as getStoredMockData } from "./mock-data"

export function useMockData() {
  // Memoized so the reference is stable across renders. Without this, any
  // component that lists getMockData in an effect's dependency array (e.g. the
  // analytics page) re-runs the effect every render → setState → re-render →
  // infinite loop ("Maximum update depth exceeded"), which wedges the client
  // router so sidebar navigation stops working after visiting that page.
  const getMockData = useCallback(() => getStoredMockData(), [])

  return {
    getMockData,
  }
}
