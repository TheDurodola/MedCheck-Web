import { handleUnauthorized } from "./apiClient"

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

/**
 * Fallback data matching the exact backend response structure:
 * {
 *   "organisation": [
 *     {
 *       "orgName": "Dizpharm Nigeria Limited",
 *       "UUID": "55b715dc-b42c-4da4-98a9-3d020902f0ed"
 *     }
 *   ]
 * }
 */
export const FALLBACK_WHOLESALERS = [
  {
    orgName: "Dizpharm Nigeria Limited",
    UUID: "55b715dc-b42c-4da4-98a9-3d020902f0ed",
  },
  {
    orgName: "Swiss Pharma Central Depot Hub",
    UUID: "a81d43a1-77b3-4f91-b384-90f7720914c1",
  },
  {
    orgName: "Ikeja Wholesale Logistics Depot Node",
    UUID: "2f9a12bc-8c31-41de-bb42-59cd38804a99",
  },
  {
    orgName: "Abuja Regional Transit Depot",
    UUID: "91ec4033-12bb-4770-a339-44589d1230ab",
  },
]

export const FALLBACK_RETAILERS = [
  {
    orgName: "Mainland Community Pharmacy Network #14",
    UUID: "c18b76df-9844-48f1-a1e9-4e7890bc1294",
  },
  {
    orgName: "Victoria Island MedPlus Chemist & Dispensary",
    UUID: "e44d8820-22c1-4b77-8091-628d77a01b22",
  },
  {
    orgName: "HealthPlus Pharmacy - Ikeja City Mall Branch",
    UUID: "f99014aa-5529-4c33-8991-38cb441890de",
  },
  {
    orgName: "Lagos Island General Hospital Dispensary",
    UUID: "0d992144-883a-4ef1-90a1-77218933b490",
  },
]

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
 * Normalizes backend responses into a standard array of stakeholder entities.
 * Specifically supports `{ "organisation": [ { "orgName": "...", "UUID": "..." } ] }`
 */
export function normalizeStakeholderList(data) {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data.organisation)) return data.organisation
  if (Array.isArray(data.organisations)) return data.organisations
  if (Array.isArray(data.organization)) return data.organization
  if (Array.isArray(data.organizations)) return data.organizations
  if (Array.isArray(data.content)) return data.content
  if (Array.isArray(data.data)) return data.data
  if (Array.isArray(data.wholesalers)) return data.wholesalers
  if (Array.isArray(data.retailers)) return data.retailers
  if (Array.isArray(data.items)) return data.items
  return []
}

/**
 * Extracts a stable unique identifier from a stakeholder organisation.
 */
export function getStakeholderId(stakeholder) {
  if (!stakeholder) return ""
  return String(stakeholder.UUID || stakeholder.id || stakeholder.orgName || "")
}

/**
 * Retrieves the formatted display label for a wholesaler or retailer entity.
 * Uses orgName from the API structure without displaying raw UUIDs.
 */
export function formatStakeholderLabel(stakeholder) {
  if (!stakeholder) return ""
  if (typeof stakeholder === "string") return stakeholder

  return (
    stakeholder.orgName ||
    stakeholder.name ||
    stakeholder.companyName ||
    stakeholder.businessName ||
    stakeholder.pharmacyName ||
    stakeholder.organizationName ||
    stakeholder.wholesalerName ||
    stakeholder.retailerName ||
    stakeholder.username ||
    "Authorized Node"
  )
}

/**
 * GET /api/v1/wholesaler
 * Response: { "organisation": [ { "orgName": "...", "UUID": "..." } ] }
 */
export async function getWholesalers(token) {
  const authToken = getAuthToken(token)
  if (!authToken) {
    console.warn("[stakeholderService] No active auth token; using fallback directory for wholesalers.")
    return FALLBACK_WHOLESALERS
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`,
  }
  const url = `${BASE_URL}/api/v1/wholesaler`
  console.log("[stakeholderService] Fetching wholesalers from:", url)

  try {
    const res = await fetch(url, { method: "GET", headers })
    if (res.status === 401 || res.status === 403) {
      handleUnauthorized()
      return FALLBACK_WHOLESALERS
    }
    if (!res.ok) {
      console.warn(`[stakeholderService] /api/v1/wholesaler responded with status ${res.status}`)
      return FALLBACK_WHOLESALERS
    }
    const data = await res.json()
    const list = normalizeStakeholderList(data)
    return list.length > 0 ? list : FALLBACK_WHOLESALERS
  } catch (err) {
    console.warn("[stakeholderService] /api/v1/wholesaler fetch failed, using fallback list:", err.message)
    return FALLBACK_WHOLESALERS
  }
}

/**
 * GET /api/v1/retailer
 * Response: { "organisation": [ { "orgName": "...", "UUID": "..." } ] }
 */
export async function getRetailers(token) {
  const authToken = getAuthToken(token)
  if (!authToken) {
    console.warn("[stakeholderService] No active auth token; using fallback directory for retailers.")
    return FALLBACK_RETAILERS
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`,
  }
  const url = `${BASE_URL}/api/v1/retailer`
  console.log("[stakeholderService] Fetching retailers from:", url)

  try {
    const res = await fetch(url, { method: "GET", headers })
    if (res.status === 401 || res.status === 403) {
      handleUnauthorized()
      return FALLBACK_RETAILERS
    }
    if (!res.ok) {
      console.warn(`[stakeholderService] /api/v1/retailer responded with status ${res.status}`)
      return FALLBACK_RETAILERS
    }
    const data = await res.json()
    const list = normalizeStakeholderList(data)
    return list.length > 0 ? list : FALLBACK_RETAILERS
  } catch (err) {
    console.warn("[stakeholderService] /api/v1/retailer fetch failed, using fallback list:", err.message)
    return FALLBACK_RETAILERS
  }
}
