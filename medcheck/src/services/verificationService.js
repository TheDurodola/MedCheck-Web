import { normalizeAuthority } from "@/features/authentication"
import { handleUnauthorized } from "./apiClient"

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
      handleUnauthorized()
      throw new Error(
        errorBody?.message || "Unauthorized access: Session expired or insufficient permissions. Redirecting to sign in..."
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

  const drugDetail = payload?.drugDetail || {}
  const logisticsHistory = Array.isArray(payload?.logisticsHistory) ? payload.logisticsHistory : []

  return {
    id: payload?.id || null,
    name:
      drugDetail?.drugBrandName ||
      payload?.productName ||
      payload?.name ||
      payload?.formulation ||
      payload?.medicineName ||
      "Verified Medication",
    genericName: drugDetail?.genericName || payload?.genericName || "",
    description: drugDetail?.description || payload?.description || "",
    manufacturer:
      drugDetail?.manufacturerName ||
      payload?.manufacturer ||
      payload?.manufacturerName ||
      payload?.organisationName ||
      "Licensed Pharmaceutical Node",
    lot:
      payload?.verificationCode ||
      payload?.lotNumber ||
      payload?.batchNumber ||
      payload?.lot ||
      payload?.batchCode ||
      cleanCode,
    verificationCode: payload?.verificationCode || cleanCode,
    nafdac:
      drugDetail?.nafdacRegistrationNumber ||
      payload?.nafdacNumber ||
      payload?.nafdacReg ||
      payload?.nafdac ||
      payload?.regulatoryNumber ||
      "REG-CONFIRMED",
    expiry: payload?.expiryDate || payload?.expiry || payload?.expDate || "N/A",
    manufactureDate: payload?.manufactureDate || payload?.mfgDate || "N/A",
    noOfPacks: payload?.noOfPacks ?? null,
    noOfSachetsPerPack: payload?.noOfSachetsPerPack ?? null,
    logisticsHistory,
    status:
      payload?.status ||
      (payload?.authentic === false ? "SUSPECT_UNREGISTERED" : "AUTHENTIC"),
    origin:
      logisticsHistory[0]?.sender ||
      drugDetail?.manufacturerName ||
      payload?.origin ||
      payload?.productionFacility ||
      payload?.dispatchNode ||
      "Certified Supply Chain",
    destination:
      logisticsHistory.length > 0
        ? logisticsHistory[logisticsHistory.length - 1]?.recipient
        : null,
    type: cleanType,
    scans: payload?.scanCount || payload?.scans || 1,
    drugDetail,
    raw: payload,
  }
}
