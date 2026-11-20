import { handleUnauthorized } from "./apiClient"

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

function getAuthToken(explicitToken) {
  if (explicitToken && typeof explicitToken === "string") return explicitToken
  if (explicitToken && typeof explicitToken === "object") {
    return explicitToken.token || explicitToken.accessToken || explicitToken.jwt || ""
  }
  try {
    const stored = localStorage.getItem("medcheck_auth")
    if (stored) {
      const parsed = JSON.parse(stored)
      const t = parsed?.token || parsed?.accessToken || parsed?.jwt
      if (t) return t
    }
    const direct =
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("accessToken")
    if (direct) return direct

    const sess = sessionStorage.getItem("medcheck_auth")
    if (sess) {
      const parsed = JSON.parse(sess)
      const t = parsed?.token || parsed?.accessToken || parsed?.jwt
      if (t) return t
    }
    const directSess =
      sessionStorage.getItem("token") || sessionStorage.getItem("jwt")
    if (directSess) return directSess
  } catch {
    // ignore
  }
  return ""
}

/**
 * POST /api/v1/wholesaler/distribution/batch
 *
 * Initiates the custody transfer of an entire batch from a wholesaler
 * to a downstream receiver organization (e.g., retailer pharmacy).
 *
 * Request Body:
 * {
 *   "batchId": "{{BATCH_UUID}}",
 *   "receiverOrganisationId": "{{RETAILER_ORG_UUID}}"
 * }
 *
 * Response Body:
 * {
 *   "message": "Batch transferred successfully",
 *   "timestamp": "2026-10-31T12:05:04.115271923"
 * }
 */
export async function transferBatch({ batchId, receiverOrganisationId, token }) {
  const authToken = getAuthToken(token)
  const url = `${BASE_URL}/api/v1/wholesaler/distribution/batch`

  console.log("[distributionService] POST /api/v1/wholesaler/distribution/batch url:", url)
  console.log("[distributionService] Request payload:", { batchId, receiverOrganisationId })

  const headers = {
    "Content-Type": "application/json",
  }
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      batchId,
      receiverOrganisationId,
    }),
  })

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized()
    throw new Error("Authentication session expired or unauthorized. Please sign in again.")
  }

  if (!res.ok) {
    let errorMsg = `Batch transfer failed with status ${res.status}`
    try {
      const errorBody = await res.json()
      if (errorBody?.message) {
        errorMsg = errorBody.message
      }
    } catch {
      // ignore
    }
    console.error("[distributionService] Transfer error:", errorMsg)
    throw new Error(errorMsg)
  }

  const data = await res.json()
  console.log("[distributionService] Transfer successful:", data)
  return data
}
