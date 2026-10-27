// In dev, VITE_API_BASE_URL is empty so requests go to Vite's proxy (/api → localhost:8080).
// In production, set VITE_API_BASE_URL to your deployed API origin.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

/**
 * POST /api/v1/auth/signin
 * Request:  { username, password }
 * Response: { token, authority }
 */
export async function signIn({ username, password }) {
  const url = `${BASE_URL}/api/v1/auth/signin`
  console.log("[authService] Sending request to:", url)
  console.log("[authService] Payload:", { username, password: "***" })

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  console.log("[authService] Response status:", res.status, "| ok:", res.ok)

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    console.error("[authService] Error body:", body)
    throw new Error(body?.message ?? "Invalid credentials. Please try again.")
  }

  const data = await res.json()
  console.log("[authService] Success response:", data)
  return data // { token, authority }
}
