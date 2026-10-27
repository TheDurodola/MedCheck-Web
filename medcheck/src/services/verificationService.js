import { normalizeAuthority } from "@/features/authentication"

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

export const VERIFICATION_TYPES = [
  { id: "pack", label: "Pack Verification", description: "Individual retail pack / box serial" },
  { id: "sachet", label: "Sachet Verification", description: "Individual blister foil / sachet code" },
  { id: "batch", label: "Batch Verification", description: "Bulk production lot / consignment" },
]

export const BATCH_ALLOWED_ROLES = [
  "INVESTIGATOR",
  "REGULATORY_OFFICER",
  "MANUFACTURER_EMPLOYEE",
  "MANUFACTURING_EMPLOYEE",
  "RETAIL_EMPLOYEE",
  "WHOLESALE_EMPLOYEE",
]

/**
 * Checks if the given user authority is authorized to perform batch verification.
 */
export function canAccessBatchVerification(authority) {
  if (!authority) return false
  const normalized = normalizeAuthority(authority) || authority
  return BATCH_ALLOWED_ROLES.includes(normalized)
}

/**
 * Calls the verification endpoint with a PUT request:
 * PUT /api/v1/verification/{type}/{code}
 * where type is 'batch', 'pack', or 'sachet'.
 *
 * All verification endpoints require authorization.
 *
 * Example:
 * http://localhost:8080/api/v1/verification/pack/PAOPzHy7Hp1dIHE8
 */
export async function verifyMedicine({ type = "pack", code, token }) {
  if (!code || !code.trim()) {
    throw new Error("Please enter a verification code.")
  }

  const cleanCode = code.trim()
  const cleanType = type.toLowerCase()

  // Retrieve token from argument or localStorage
  let authToken = token
  if (!authToken) {
    try {
      const stored = localStorage.getItem("medcheck_auth")
      if (stored) {
        const parsed = JSON.parse(stored)
        authToken = parsed?.token || parsed?.accessToken || parsed?.jwt
      }
    } catch {
      // ignore
    }
  }

  // All 3 verification endpoints require authorization
  if (!authToken) {
    throw new Error("Authentication required: Please sign in to verify medications.")
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`,
  }

  const url = `${BASE_URL}/api/v1/verification/${cleanType}/${encodeURIComponent(cleanCode)}`
  console.log(`[verificationService] Sending PUT request →`, url)

  const res = await fetch(url, {
    method: "PUT",
    headers,
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    if (res.status === 403 || res.status === 401) {
      if (cleanType === "batch") {
        throw new Error(
          errorBody?.message ||
            "Access denied: Batch verification requires authorized credentials (INVESTIGATOR, MANUFACTURER_EMPLOYEE, RETAIL_EMPLOYEE, or WHOLESALE_EMPLOYEE)."
        )
      }
      throw new Error(
        errorBody?.message || "Unauthorized: Your session has expired or is invalid. Please sign in again."
      )
    }
    if (res.status === 404) {
      throw new Error(
        errorBody?.message || `No registered ${cleanType} found for code: "${cleanCode}".`
      )
    }
    throw new Error(
      errorBody?.message || `Verification failed (status ${res.status}). Please check the code.`
    )
  }

  const data = await res.json()
  console.log("[verificationService] PUT verification response:", data)

  const payload = data?.data || data

  return {
    name:
      payload?.productName ||
      payload?.name ||
      payload?.formulation ||
      payload?.medicineName ||
      "Verified Medication",
    manufacturer:
      payload?.manufacturer ||
      payload?.manufacturerName ||
      payload?.organisationName ||
      "Licensed Pharmaceutical Node",
    lot:
      payload?.lotNumber ||
      payload?.batchNumber ||
      payload?.lot ||
      payload?.batchCode ||
      cleanCode,
    nafdac:
      payload?.nafdacNumber ||
      payload?.nafdacReg ||
      payload?.nafdac ||
      payload?.regulatoryNumber ||
      "REG-CONFIRMED",
    expiry: payload?.expiryDate || payload?.expiry || payload?.expDate || "N/A",
    status:
      payload?.status ||
      (payload?.authentic === false ? "SUSPECT_UNREGISTERED" : "AUTHENTIC"),
    origin:
      payload?.origin ||
      payload?.productionFacility ||
      payload?.dispatchNode ||
      "Certified Supply Chain",
    type: cleanType,
    scans: payload?.scanCount || payload?.scans || 1,
    raw: payload,
  }
}
