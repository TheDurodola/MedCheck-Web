import { handleUnauthorized } from "./apiClient"

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

/**
 * Standard pharmaceutical drugs and batches catalog matching the required JSON schema:
 * {
 *   "drugs": [
 *     {
 *       "drugId": "...",
 *       "drugBrandName": "Panadol Extra",
 *       "drugGenericName": "Paracetamol 500mg, Caffeine 30mg",
 *       "drugManufacturerName": "Emzor Pharmaceutical Industries",
 *       "drugNafdacNumber": "04-0005",
 *       "drugDescription": "...",
 *       "batches": [
 *         {
 *           "id": "...",
 *           "batchIdentifier": "AAOB1",
 *           "verificationCode": "AAOBvzrIK8xrqKWw",
 *           "manufactureDate": "2026-10-31",
 *           "expirationDate": "2029-10-30",
 *           "verificationCount": 8,
 *           "noOfPacks": 50,
 *           "created": "2026-10-31T09:50:54.602643Z"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const DEFAULT_DRUGS_DATA = {
  drugs: [
    
  ],
}

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
 * Normalizes backend responses into a standard list of drugs with batches.
 * Accepts:
 * - { "drugs": [ ... ] }
 * - [ ... ]
 * - { "data": [ ... ] }
 * - { "content": [ ... ] }
 */
export function normalizeDrugList(data) {
  if (!data) return DEFAULT_DRUGS_DATA.drugs
  if (Array.isArray(data)) return data
  if (Array.isArray(data.drugs)) return data.drugs
  if (Array.isArray(data.content)) return data.content
  if (Array.isArray(data.data)) return data.data
  return DEFAULT_DRUGS_DATA.drugs
}

/**
 * GET /api/v1/batch
 * Retrieves registered pharmaceutical drugs catalog with their associated batches.
 * Response format: { "drugs": [ { "drugId": "...", "drugBrandName": "...", batches: [...] } ] }
 */
export async function getAvailableDrugs(token) {
  const authToken = getAuthToken(token)
  if (!authToken) {
    console.warn("[drugService] No auth token found; returning default drugs catalog without querying /api/v1/batch")
    return DEFAULT_DRUGS_DATA.drugs
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`,
  }
  const url = `${BASE_URL}/api/v1/batch`
  console.log("[drugService] Fetching drugs with batches from:", url)

  try {
    const res = await fetch(url, { method: "GET", headers })
    if (res.status === 401 || res.status === 403) {
      handleUnauthorized()
      return DEFAULT_DRUGS_DATA.drugs
    }
    if (!res.ok) {
      console.warn(`[drugService] /api/v1/batch responded with status ${res.status}`)
      return DEFAULT_DRUGS_DATA.drugs
    }
    const data = await res.json()
    const list = normalizeDrugList(data)
    return list.length > 0 ? list : DEFAULT_DRUGS_DATA.drugs
  } catch (err) {
    console.warn("[drugService] /api/v1/batch query error, using local catalog:", err.message)
    return DEFAULT_DRUGS_DATA.drugs
  }
}
